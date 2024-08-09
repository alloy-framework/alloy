function noLeadingLb() {
  const t1 = <Hi>  oh {sub} hi {sub} there
how</Hi>;
  const t2 = <Hi>  oh {sub} hi {sub}
there</Hi>;
  const t3 = <Hi>oh {sub} hi {sub} there
how</Hi>;
  const t4 = <Hi>oh {sub} hi {sub}
there</Hi>;
}
function leadingLb() {
  const t1 = <Hi>oh {sub} hi {sub} there
how</Hi>;
  const t2 = <Hi>oh {sub} hi {sub}
there</Hi>;
}
function noTrailingLb() {
  const t1 = <Hi>oh {sub} hi {sub} there
how</Hi>;
  const t2 = <Hi>oh {sub} hi {sub}
there</Hi>;
}