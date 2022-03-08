import './Help.scss'
import Tippy from '@tippyjs/react'
import { CodeBlock } from '@components'
import { HelpIcon } from '@icons'
import { useTranslation } from '@hooks'

const { CodeInline, Keyword, Code, String, Boolean, Operator } = CodeBlock

function HelpContent() {
  const $ = useTranslation()

  return (
    <>
      <h3>{$('$HELP_PREFIXES_TITLE$')}</h3>
      {$('$HELP_PREFIXES_BODY1$')}{' '}
      <CodeInline>
        <Keyword>state:</Keyword>
      </CodeInline>{' '}
      {$('$HELP_PREFIXES_BODY2$')}
      <Code>
        <Keyword>state:</Keyword>
        <String>"engine"</String>
      </Code>
      {$('$HELP_PREFIXES_BODY1$')}{' '}
      <CodeInline>
        <Keyword>path:</Keyword>
      </CodeInline>{' '}
      {$('$HELP_PREFIXES_BODY3$')}
      <Code>
        <Keyword>path:</Keyword>
        <String>"actions.dmi"</String>
      </Code>
      <h3>{$('$HELP_BOOLEANS_TITLE$')}</h3>
      {$('$HELP_BOOLEANS_BODY1$')}{' '}
      <CodeInline>
        <Boolean>OR</Boolean>
      </CodeInline>
      ,{' '}
      <CodeInline>
        <Boolean>AND</Boolean>
      </CodeInline>{' '}
      {$('$HELP_BOOLEANS_BODY2$')}:
      <Code>
        <Keyword>state:</Keyword>
        <String>"emp"</String> <Boolean>AND</Boolean> <Keyword>path:</Keyword>
        <String>"actions.dmi"</String>
      </Code>
      <h3>{$('$HELP_MISC_TITLE$')}</h3>
      {$('$HELP_MISC_BODY1$')}{' '}
      <CodeInline>
        <Operator>-</Operator>
      </CodeInline>{' '}
      {$('$HELP_MISC_BODY2$')}{' '}
      <CodeInline>
        <Operator>+</Operator>
      </CodeInline>{' '}
      {$('$HELP_MISC_BODY3$')}
      <Code>
        <Keyword>state:</Keyword>
        <String>"emp"</String> <Boolean>AND</Boolean> <Operator>-</Operator>
        <Keyword>path:</Keyword>
        <String>"actions.dmi"</String>
      </Code>
      {$('$HELP_SEE$')}{' '}
      <a
        target='_blank'
        href='https://docs.rs/tantivy/latest/tantivy/query/struct.QueryParser.html'
      >
        {$('$HELP_DETAILS$')}
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
      animation='scale'
    >
      <HelpIcon />
    </Tippy>
  )
}
