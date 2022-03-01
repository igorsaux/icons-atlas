import '../styles/Help.scss'
import Tippy from '@tippyjs/react'
import { Boolean, Code, CodeInline, Keyword, Operator, String } from './Code'

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
      <svg
        class='Help'
        viewBox='0 0 64 64'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle cx='32' cy='32' r='31.5' fill='#585858' stroke='#727272' />
        <path
          d='M34.5547 37.1953H27.8281C27.8281 35.8203 27.9219 34.6094 28.1094 33.5625C28.3125 32.5 28.6562 31.5469 29.1406 30.7031C29.625 29.8594 30.2812 29.0781 31.1094 28.3594C31.8438 27.75 32.4766 27.1641 33.0078 26.6016C33.5391 26.0391 33.9453 25.4688 34.2266 24.8906C34.5078 24.3125 34.6484 23.6953 34.6484 23.0391C34.6484 22.2266 34.5312 21.5625 34.2969 21.0469C34.0781 20.5312 33.7422 20.1484 33.2891 19.8984C32.8516 19.6328 32.2969 19.5 31.625 19.5C31.0781 19.5 30.5625 19.6328 30.0781 19.8984C29.6094 20.1641 29.2266 20.5781 28.9297 21.1406C28.6328 21.6875 28.4688 22.4141 28.4375 23.3203H20.4922C20.5391 20.9922 21.0547 19.1016 22.0391 17.6484C23.0391 16.1797 24.3672 15.1094 26.0234 14.4375C27.6953 13.75 29.5625 13.4062 31.625 13.4062C33.9062 13.4062 35.8672 13.7578 37.5078 14.4609C39.1484 15.1641 40.4062 16.2109 41.2812 17.6016C42.1562 18.9766 42.5938 20.6719 42.5938 22.6875C42.5938 24.0312 42.3359 25.2031 41.8203 26.2031C41.3203 27.1875 40.6406 28.1094 39.7812 28.9688C38.9375 29.8125 37.9922 30.7188 36.9453 31.6875C36.0391 32.4844 35.4219 33.2969 35.0938 34.125C34.7656 34.9375 34.5859 35.9609 34.5547 37.1953ZM26.8672 44.3203C26.8672 43.1953 27.2734 42.2578 28.0859 41.5078C28.8984 40.7422 29.9531 40.3594 31.25 40.3594C32.5469 40.3594 33.6016 40.7422 34.4141 41.5078C35.2266 42.2578 35.6328 43.1953 35.6328 44.3203C35.6328 45.4453 35.2266 46.3906 34.4141 47.1562C33.6016 47.9062 32.5469 48.2812 31.25 48.2812C29.9531 48.2812 28.8984 47.9062 28.0859 47.1562C27.2734 46.3906 26.8672 45.4453 26.8672 44.3203Z'
          fill='white'
        />
      </svg>
    </Tippy>
  )
}
