[Winter]: <https://github.com/lite-xl/lite-xl-colors/blob/master/colors/winter.lua>

# Theme creation

To create a theme for the Lite-XL you'll need the colors and a file at `lite-xl/color` directory, the first lines of the
file looks like:

```lua
local style = require "core.style"
local common = require "core.common"
```

And after this the colors are put at the `core.style` table for the text editor UI and after at the `core.style.syntax`  
for the syntax highlighter, but if the color is in hexadecimal format you can't put it directly at the variable,
it need to be parsed by the function `core.common.color`, this function will return three(RGB) or four(RGBA) numbers in
decimal format, and it need to be at a array, so you need to create one with the result, it looks like:

```lua
style.background = { common.color "#282a36" }
```

You can use the RGB(A) format instead of the hexadecimal format, for this you don't need to use this function, only
put your color values directly at the array, to generate the same color of above you can do:

```lua
style.background = { 40, 42, 54 }
```

To see a complete theme you can click [here][Winter].


## Editor UI

  - `accent`         > Text of selected suggestion of command pallete, "unsaved changes" icon in the status bar and project search hovered results;
  - `background`     > Background of the text editor(DocView);
  - `background2`    > Background of file tree(TreeView), status bar, toolbar and secundary background for the tabs bar;
  - `background3`    > Background of autocomplete, status bar tooltips(version 2.1 and above) and suggestions of command palette;
  - `caret`          > Color of the cursor;
  - `dim`            > Inactive tab title, tabs separator, toolbar icons, prefix of logs, search results, shortcuts in the command pallete suggestion and other things in the status bar;
  - `divider`        > Color of divisors;
  - `line_highlight` > Actual cursor line background;
  - `line_number`    > Line number when the cursor is outside;
  - `line_number2`   > Line number with the cursor;
  - `scrollbar`      > Scroll bar default color;
  - `scrollbar2`     > Scroll bar when hovered;
  - `selection`      > Selected text;
  - `text`           > Normal UI text.


## Syntax colors

  - `comment`  > Commented part of code
  - `function` > A function/method call or creation
  - `keyword`  > Programming language keywords
  - `keyword2` > Types of the programming language and created by the programmer
  - `literal`  > Language literals(ex: true, false)
  - `normal`   > Normal text
  - `number`   > All types of number
  - `operator` > Operators(ex: +, -, =)
  - `string`   > A text string
  - `symbol`   > Variables

