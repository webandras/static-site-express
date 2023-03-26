---
title: Markdown cheatsheet, markdown-it plugins
date: "2018-06-25"
excerpt: >-
  I created this post for those who are unfamiliar with the syntax of Markdown. People who are already similar with Markdown should also check this post because I use some special plugins that provide additional features.
coverImage: writing.jpg
---

I created this post for those who are unfamiliar with the syntax of Markdown which is a markup language. People who are already familiar with Markdown should also check this post because I use some special plugins for `markdown-it` that provide additional features.

For safety reasons, you cannot include HTML code into Markdown. By default, HTML is escaped.

## Table of Contents

---

### General syntax

1. [Headings](#headings)
2. [Emphasis](#emphasis)
3. [Paragraphs, line breaks](#paragraph)
4. [Horizontal rule](#hrule)
5. [Blockquotes](#blockquotes)
6. [Links](#links)
7. [Lists](#lists)

### Special syntax

1. [Add a CSS class and an #id to an element](#add-class)
2. [Table with caption](#tables)
3. [Image with caption](#images)
4. [Code syntax highlighting](#highlight)

---

## General syntax

### 1. Headings{id=headings}

```markdown
# H1
## H2
### H3
#### H4
##### H5
###### H6

Alternatively, for H1 and H2, an underline-ish style:

Alt-H1
======

Alt-H2
------
```

# H1

## H2

### H3

#### H4

##### H5

###### H6

Alternatively, for H1 and H2, an underline-ish style:

# Alt-H1

## Alt-H2

### 2. Emphasis{id=emphasis}

```markdown
Emphasis, aka italics, with _asterisks_ or _underscores_.

Strong emphasis, aka bold, with **asterisks** or **underscores**.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~
```

Emphasis, aka italics, with _asterisks_ or _underscores_.

Strong emphasis, aka bold, with **asterisks** or **underscores**.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~

### 3. Paragraphs, line breaks{id=paragraph}

My basic recommendation for learning how line breaks work is to experiment and discover -- hit <Enter> once (i.e., insert one newline), then hit it twice (i.e., insert two newlines), see what happens. You'll soon learn to get what you want. "Markdown Toggle" is your friend.

Here are some things to try out:

```markdown
Here's a line for us to start with.

This line is separated from the one above by two newlines, so it will be a _separate paragraph_.

This line is also a separate paragraph, but...
This line is only separated by a single newline, so it's a separate line in the _same paragraph_.
Here's a line for us to start with.

This line is separated from the one above by two newlines, so it will be a separate paragraph.

This line is also begins a separate paragraph, but...
This line is only separated by a single newline, so it's a separate line in the same paragraph.
```

Here's a line for us to start with.

This line is separated from the one above by two newlines, so it will be a _separate paragraph_.

This line is also a separate paragraph, but...
This line is only separated by a single newline, so it's a separate line in the _same paragraph_.
Here's a line for us to start with.

This line is separated from the one above by two newlines, so it will be a separate paragraph.

This line is also begins a separate paragraph, but...
This line is only separated by a single newline, so it's a separate line in the same paragraph.

### 4. Horizontal rule{id=hrule}

```markdown
Three or more...

---

Hyphens

---

Asterisks

---

Underscores
```

Three or more...

---

Hyphens

---

Asterisks

---

Underscores

### 5. Blockquotes{id=blockquotes}

```markdown
> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can _put_ **Markdown** into a blockquote.
```

> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can _put_ **Markdown** into a blockquote.

### 6. Links{id=links}

Some ways to use links:

```markdown
[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][arbitrary case-insensitive reference text]

[I'm a relative reference to a repository file](../blob/master/LICENSE)

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs in angle brackets will automatically get turned into links:  
<http://www.example.com>.

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com
```

[I'm an inline-style link](http://www.example.com/)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][arbitrary case-insensitive reference text]

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs in angle brackets will automatically get turned into links:  
<http://www.example.com>.

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: https://www.mozilla.org
[link text itself]: https://www.mozilla.org

### 7. Lists{id=lists}

(In this example, leading and trailing spaces are shown with with dots: ⋅)

```markdown
1. First ordered list item
2. Another item
   ⋅⋅\* Unordered sub-list.
3. Actual numbers don't matter, just that it's a number
   ⋅⋅1. Ordered sub-list
4. And another item.

⋅⋅⋅You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

⋅⋅⋅To have a line break without a paragraph, you will need to use two trailing spaces.⋅⋅
⋅⋅⋅Note that this line is separate, but within the same paragraph.⋅⋅
⋅⋅⋅(This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

- Unordered list can use asterisks

* Or minuses

- Or pluses
```

1. First ordered list item
2. Another item

- Unordered sub-list.

1. Actual numbers don't matter, just that it's a number
1. Ordered sub-list
1. And another item.

   You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

   To have a line break without a paragraph, you will need to use two trailing spaces.  
   Note that this line is separate, but within the same paragraph.  
   (This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

- Unordered list can use asterisks

* Or minuses

- Or pluses

## Special syntax

### 1. Add a CSS class and an #id to an element{id=add-class}

One example add underline to a link (by default, Bootstrap 3 does not use underline for the links - I might change this behaviour though):

`[link](https://highlightjs.org/){.underline}`

And the result is: [link](https://highlightjs.org/){.underline}

It is very important that you should not use whitespace, otherwise it will not work!

Add an id to an element: `## Special syntax{id=special}`. It converts to `<h2 id="special">Special syntax</h2>`.

### 2. Table with caption{id=tables}

```markdown
| Year | Column 1 | Column 2 |
| ---- | -------- | -------- |
| 1993 | 60       | 70       |
| 2007 | 145      | 300      |
| 2010 | 455      | 700      |
| 2018 | 1024     | 576      |

[Table 1: Three columns filled with some numbers]
```

And the result:

| Year | Column 1 | Column 2 |
| ---- | -------- | -------- |
| 1993 | 60       | 70       |
| 2007 | 145      | 300      |
| 2010 | 455      | 700      |
| 2018 | 1024     | 576      |

[Table 1: Three columns filled with some numbers]

### 3. Image with caption{id=images}

Syntax: `![caption text](link-to-image)`

Example:
`![Figure 1. Interest in static site generators over time (Google Trends)](/assets/images/uploads/trend.png)`

![Figure 1. Interest in static site generators over time (Google Trends)](/assets/images/uploads/trend.png)

### 4. Code {id=highlight}

````plain
```javascript

var a = 20

function foo (a) {
  console.log(a)
}

foo(a)
```
````


```javascript

var a = 20

function foo (a) {
  console.log(a)
}

foo(a)
```


To have proper syntax highlighting, you have to integrate the [highlight.js](https://highlightjs.org/) library.


## Source of the general syntax part

- Adam Pritchard (2017). [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet){.underline}.
