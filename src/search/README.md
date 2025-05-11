# Search Suggestion Feature

## Tổng quan

Tính năng search suggestion (gợi ý tìm kiếm) đã được triển khai nhưng đang gặp một số vấn đề với tiếng Việt. Hiện tại, tính năng này hoạt động tốt với các từ khóa có dấu như "Sân", "Tennis", nhưng không hoạt động với các từ khóa không dấu như "san", "bong".

## Cấu trúc hiện tại

1. **API Endpoint**: `GET /search/suggestions?prefix=<từ khóa>&type=<loại>&size=<số lượng>`
   - `prefix`: Từ khóa tìm kiếm
   - `type`: Loại gợi ý (name, location, all)
   - `size`: Số lượng gợi ý tối đa

2. **Phương thức xử lý**: `SearchService.getSuggestions()`
   - Sử dụng `match_phrase_prefix` query để tìm kiếm các cơ sở có tên hoặc địa điểm bắt đầu bằng từ khóa

3. **Kết quả trả về**: Danh sách các gợi ý với định dạng:
   ```json
   {
     "suggestions": [
       {
         "text": "Tên hoặc địa điểm",
         "type": "name hoặc location"
       },
       ...
     ]
   }
   ```

## Vấn đề hiện tại

1. **Phân biệt dấu**: Elasticsearch đang phân biệt giữa chữ có dấu và không dấu trong tiếng Việt
2. **Analyzer**: Chưa có analyzer phù hợp cho tiếng Việt

## Giải pháp đề xuất

1. **Cấu hình analyzer tiếng Việt**:
   - Tạo custom analyzer cho tiếng Việt sử dụng các filters như:
     - `asciifolding`: Chuyển đổi các ký tự có dấu thành không dấu
     - `lowercase`: Chuyển đổi tất cả thành chữ thường
     - `edge_ngram`: Tạo các token con để hỗ trợ tìm kiếm từng phần

2. **Cập nhật mapping**:
   - Cập nhật mapping cho các trường `name` và `location` để sử dụng analyzer tiếng Việt

3. **Sử dụng multi-fields**:
   - Cấu hình nhiều loại index cho cùng một trường để hỗ trợ nhiều kiểu tìm kiếm khác nhau

## Ví dụ cấu hình analyzer tiếng Việt

```json
{
  "settings": {
    "analysis": {
      "analyzer": {
        "vietnamese_analyzer": {
          "type": "custom",
          "tokenizer": "standard",
          "filter": [
            "lowercase",
            "asciifolding",
            "vietnamese_stop"
          ]
        },
        "vietnamese_search_analyzer": {
          "type": "custom",
          "tokenizer": "standard",
          "filter": [
            "lowercase",
            "asciifolding"
          ]
        },
        "vietnamese_edge_ngram": {
          "type": "custom",
          "tokenizer": "standard",
          "filter": [
            "lowercase",
            "asciifolding",
            "edge_ngram_filter"
          ]
        }
      },
      "filter": {
        "vietnamese_stop": {
          "type": "stop",
          "stopwords": ["và", "hoặc", "trong", "tại", "của"]
        },
        "edge_ngram_filter": {
          "type": "edge_ngram",
          "min_gram": 1,
          "max_gram": 20
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "name": {
        "type": "text",
        "analyzer": "vietnamese_analyzer",
        "search_analyzer": "vietnamese_search_analyzer",
        "fields": {
          "keyword": {
            "type": "keyword"
          },
          "edge_ngram": {
            "type": "text",
            "analyzer": "vietnamese_edge_ngram",
            "search_analyzer": "vietnamese_search_analyzer"
          }
        }
      },
      "location": {
        "type": "text",
        "analyzer": "vietnamese_analyzer",
        "search_analyzer": "vietnamese_search_analyzer",
        "fields": {
          "keyword": {
            "type": "keyword"
          },
          "edge_ngram": {
            "type": "text",
            "analyzer": "vietnamese_edge_ngram",
            "search_analyzer": "vietnamese_search_analyzer"
          }
        }
      }
    }
  }
}
```

## Các bước tiếp theo

1. Cập nhật `elasticsearch.service.ts` để thêm cấu hình analyzer tiếng Việt
2. Cập nhật mapping cho index facilities
3. Rebuild index và reindex dữ liệu
4. Cập nhật phương thức `getSuggestions()` để sử dụng các fields mới 