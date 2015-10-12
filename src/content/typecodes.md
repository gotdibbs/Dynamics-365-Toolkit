---
page: typecodes
title: Type Codes
short_title: Type Codes
index: 4
template: default.hbt
---

### Search by Type Code
<input type="text" class="form-control" placeholder="e.g. 1" id="typecode" onkeypress="return isNumberKey(event)"/><button class="btn btn-small btn-default" onclick="searchType();">&raquo;</button><b><kbd id="entityName" style="display: none;"></kbd></b>

---
### Searh by Logical Name
<input type="text" class="form-control" placeholder="e.g. account" id="typename" onkeypress="return isEnterKey(event)"/><button class="btn btn-small btn-default" onclick="searchLogical();">&raquo;</button><b><kbd id="entityType" style="display: none;"></kbd></b>