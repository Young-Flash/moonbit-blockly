fn diy_controll(a : Int) -> Direction {
    match a {
    1 => Up
    2 => Down
    3 => Left
    4 => Right
    // 3 => Right
    // 4 => Left
    _ => Default
  }
}