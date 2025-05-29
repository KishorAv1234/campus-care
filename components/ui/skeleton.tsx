function Skeleton(props) {
  const { className, ...rest } = props
  return <div className={`animate-pulse rounded-md bg-muted ${className || ""}`} {...rest} />
}

export { Skeleton }
