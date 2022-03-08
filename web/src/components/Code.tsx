import '../styles/Code.scss'
import { ComponentChildren } from 'preact'

type KeywordProps = {
  children: ComponentChildren
}

export function Keyword(props: KeywordProps) {
  return <span className='Keyword'>{props.children}</span>
}

type StringProps = {
  children: ComponentChildren
}

export function String(props: StringProps) {
  return <span className='String'>{props.children}</span>
}

type BooleanProps = {
  children: ComponentChildren
}

export function Boolean(props: BooleanProps) {
  return <span className='Boolean'>{props.children}</span>
}

type OperatorProps = {
  children: ComponentChildren
}

export function Operator(props: OperatorProps) {
  return <span className='Operator'>{props.children}</span>
}

type CodeProps = {
  children: ComponentChildren
}

export function Code(props: CodeProps) {
  return <pre className='Code'>{props.children}</pre>
}

export function CodeInline(props: CodeProps) {
  return <code className='Code'>{props.children}</code>
}
