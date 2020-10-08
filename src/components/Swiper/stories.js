import * as React from 'react'
import SwiperCore, { A11y, Keyboard, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Media from '@oakwood/oui/Media'

export default {
  title: 'Components/Swiper',
  component: Swiper,
}

const Template = (args) => {
  SwiperCore.use([A11y, Keyboard, Navigation, Pagination])

  const navigationPrevRef = React.useRef(null)
  const navigationNextRef = React.useRef(null)
  const paginationRef = React.useRef(null)

  return (
    <Swiper
      // React refs not yet supported: https://github.com/nolimits4web/swiper/issues/3855
      // navigation={{
      //   prevEl: navigationPrevRef.current,
      //   nextEl: navigationNextRef.current,
      // }}
      // pagination={{
      //   el: paginationRef.current,
      //   clickable: true,
      // }}
      onInit={(swiper) => {
        setTimeout(() => {
          swiper.params.navigation.prevEl = navigationPrevRef.current
          swiper.params.navigation.nextEl = navigationNextRef.current
          swiper.navigation.init()
          swiper.navigation.update()

          swiper.params.pagination.el = paginationRef.current
          swiper.params.pagination.clickable = true
          swiper.pagination.init()
          swiper.pagination.render()
          swiper.pagination.update()
        })
      }}
      keyboard
      {...args}
    >
      {Array.from(new Array(6), (val, idx) => (
        <SwiperSlide key={idx}>
          <Media component="img" src={`//placekitten.com/800/${400 - idx}`} />
        </SwiperSlide>
      ))}

      <div className="swiper-button-prev" ref={navigationPrevRef} />
      <div className="swiper-button-next" ref={navigationNextRef} />
      <div className="swiper-pagination" ref={paginationRef} />
    </Swiper>
  )
}

export const Default = Template.bind({})
Default.args = {}
