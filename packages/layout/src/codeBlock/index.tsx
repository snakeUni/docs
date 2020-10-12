import * as React from 'react'
import Highlight, { defaultProps, PrismTheme, Language } from 'prism-react-renderer'
import { MDXProvider } from '@mdx-js/react'
// 默认使用 nightOwl 主题
import theme from 'prism-react-renderer/themes/nightOwl'

export interface IProps {
  children: string
  language?: Language
  theme?: PrismTheme
}

interface PreProps {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

const Pre = ({ className, style, children }: PreProps) => {
  const innerStyle: React.CSSProperties = {
    display: 'table-cell',
    textAlign: 'right',
    paddingRight: '1em',
    userSelect: 'none',
    opacity: 0.5
  }
  return (
    <pre className={className} style={{ ...innerStyle, ...style }}>
      {children}
    </pre>
  )
}

const LineNo = ({ children }: { children?: React.ReactNode }) => {
  const innerStyle: React.CSSProperties = {
    display: 'table-cell',
    textAlign: 'right',
    paddingRight: '1em',
    userSelect: 'none',
    opacity: 0.5
  }
  return <span style={innerStyle}>{children}</span>
}

export function CodeBlock({ children = '', language = 'jsx' }: IProps) {
  return (
    <Highlight {...defaultProps} theme={theme} code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              <LineNo>{i + 1}</LineNo>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Pre>
      )}
    </Highlight>
  )
}

interface MDXProps {
  children?: React.ReactNode
}

// https://github.com/mdx-js/mdx/blob/master/packages/react/readme.md
// 对 code 进行重写
const components = {
  // 所有的 code 都使用 CodeBlock 包裹，默认带有高亮行数等特性。
  code: CodeBlock,
  pre: (props: any) => <div {...props} />
}

export function MDX({ children }: MDXProps) {
  return (
    <MDXProvider components={components}>
      <div className="container">{children}</div>
    </MDXProvider>
  )
}
