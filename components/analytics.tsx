export function Analytics() {
  return (
    <>
      {/* Analytics script would go here */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            console.log('Analytics loaded for campus.care');
          `,
        }}
      />
    </>
  )
}
