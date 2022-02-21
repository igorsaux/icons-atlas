import Tippy from '@tippyjs/react'
import { Boolean, Code, CodeInline, Keyword, Operator, String } from './Text'

function HelpContent() {
  return (
    <>
      <h3>Prefixes</h3>
      Use prefix{' '}
      <CodeInline>
        <Keyword>state:</Keyword>
      </CodeInline>{' '}
      to search across icon state names:
      <Code>
        <Keyword>state:</Keyword>
        <String>"engine"</String>
      </Code>
      Use prefix{' '}
      <CodeInline>
        <Keyword>path:</Keyword>
      </CodeInline>{' '}
      to search across icon paths:
      <Code>
        <Keyword>path:</Keyword>
        <String>"actions.dmi"</String>
      </Code>
      <h3>Booleans</h3>
      Use boolean operators{' '}
      <CodeInline>
        <Boolean>OR</Boolean>
      </CodeInline>
      ,{' '}
      <CodeInline>
        <Boolean>AND</Boolean>
      </CodeInline>{' '}
      to combine queries:
      <Code>
        <Keyword>state:</Keyword>
        <String>"emp"</String> <Boolean>AND</Boolean> <Keyword>path:</Keyword>
        <String>"actions.dmi"</String>
      </Code>
      <h3>Misc</h3>
      Also, you can use{' '}
      <CodeInline>
        <Operator>-</Operator>
      </CodeInline>{' '}
      to exclude a query and{' '}
      <CodeInline>
        <Operator>+</Operator>
      </CodeInline>{' '}
      to require some query:
      <Code>
        <Keyword>state:</Keyword>
        <String>"emp"</String> <Boolean>AND</Boolean> <Operator>-</Operator>
        <Keyword>path:</Keyword>
        <String>"actions.dmi"</String>
      </Code>
      See{' '}
      <a
        target='_blank'
        href='https://docs.rs/tantivy/latest/tantivy/query/struct.QueryParser.html'
      >
        details
      </a>
      .
    </>
  )
}

export default function Help() {
  return (
    <Tippy
      content={<HelpContent />}
      interactive={true}
      interactiveBorder={20}
      theme='dark'
    >
      <span className='Help'>?</span>
    </Tippy>
  )
}
