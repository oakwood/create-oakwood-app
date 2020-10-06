import * as React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import SbEditable from 'storyblok-react'
import StoryblokService from 'utils/storyblok-service'
import { useStoryblok } from 'utils/storyblok'
import { pages } from 'api/mock'
import { useHeaderColor } from 'utils'
import * as blocks from 'blocks'

function Page(props) {
  const { page } = props

  useHeaderColor(pages.Content.headerColor)

  const content = useStoryblok(page)

  return (
    <>
      <Head>
        <title>Page | Create Oakwood App</title>
        <script src={StoryblokService.bridge()} />
      </Head>

      {content?.body?.map((block) => {
        const { component, uid, ...blockProps } = block
        const Block = blocks[component]

        return (
          <SbEditable key={uid} content={block}>
            <Block {...blockProps} />
          </SbEditable>
        )
      })}
    </>
  )
}

Page.propTypes = {
  page: PropTypes.object,
}

Page.getInitialProps = async ({ query }) => {
  StoryblokService.setQuery(query)

  const slug = query?.uri?.pop() || 'home'

  return {
    page: await StoryblokService.get(`cdn/stories/${slug}`),
  }
}

export default Page
