<!-- 0.9.2 -->
<center>0.9.1 -> 0.9.2</center>

## New Features
 - Added ***Developer Mode Toggle*** in slide menu to hide App critical functions.
 - Added ***Filters*** In ***Spend History***  view for better expenditure analysis.
 - Added  ***Group By*** option in ***Spend History***  view for grouping expenditure.
 - Added ***Base Template*** in ***Spend History*** page.
 - Added ***Day of Week*** in ***Spend History*** page.
 - Added ***Payment Mode Button*** in ***Add Expense*** page.
 - Improved ***UI*** of the App
 
## Structure Changes
- Replaced ***Span-from*** from ***Required Template*** for ***Homepage logging toggle*** which can be toggled in it's item-view page. Only those required items will be logged on homepage until there toggle is on.
- Added more ***Validation data*** in Item-Details view.
- Added ***installation script*** for changing Local Storage JSON Structure.
- ***Initialized dates*** now in required don't pass the first entry's date.


## Bug Fixes
- Fixed ***Empty Spend*** Name
- Fixed ***Wild Input Fields***
- Fixed ***Span-till's Date Picker***
- Fixed ***Modal not closing*** on Delete Values
- Fixed ***Registration of spending*** when the start span date of required category is future and not today.
- Fixed editing ***Item specific date*** in required doesn't works
- Fixed 0 while adding item to a existing catagory past date.
- Fixed ***Delete entries*** doesn't work this year when the catagory is not fully filled
- Fixed ***Main Page*** Required template logging

## Minor Changes 
- Added function to ***separate money value*** with commas too in Spend History view.
- View wants, then needs, then required in ***Spend History*** page.
- Added ***month names*** in the edit menu for entries and values per month
