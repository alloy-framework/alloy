/*
After normal transform:
* Group sequences of lines which are conditional
* If literal text comes after the group, consume group plus trailing linebreak.
  Join by line break. Render trailing linebreak if anything in group is present.
* If group is before end of component/fragment, consume leading linebreak plus
  group. Join by line break. Render leading linebreak if anything in group is
  present.
*/

/*
function Foo() {
  return <A>
    {a}
    {b}
    c
  </A>
}

function Foo() {
  return <A>{maybeLine(a)}{maybeLine(b)}c</A>
}
function Bar() {
  return <A>
    {a}x
    {b}
    c
  </A>
}

function Bar() {
  return <A>{a}x{maybeLine(() => b)}c</A>
}

function Baz() {
  return <A>
    {a}x
    {b}
  </A>
}
function Baz() {
  return <A>{a}x
{b}</A>
}
function Baz() {
  return <A>{a}x{maybeLastLine(() => b)}</A>
}

maybeLines -> lines.join("\n");
maybeLastLines -> "\n" + lines.join("\n");

function Baz2() {
  return <A>
    {a}
    {b}
    {c}
  </A>
}

function Baz2() {
  return <A>{maybeLine(a)}{maybeLine(b)}{maybeLastLine(c)}</A>
}

maybeLine -> x + "\n";
maybeLastLine -> x;

const maybeLines = <>{a}
{b}
{c}</>

const maybeLastLines = <>start
{a}
{b}
{c}</>

const bothLines = <>{a}
start
{a}
middle
{a}</>

const bothLines = <>{maybeStart(a)}start
{maybeStart(a)}middle{maybeEnd(a)}</>
*/
