/**
 * GradientText — React Bits–style gradient headline
 */
export function GradientText({ children, className = '', as: Tag = 'span' }) {
  return (
    <Tag
      className={`inline-block bg-gradient-to-r from-[#00695C] via-[#0D9488] to-[#FF6F00] bg-clip-text text-transparent ${className}`}
    >
      {children}
    </Tag>
  )
}
