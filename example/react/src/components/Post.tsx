import * as React from "react";
import image from "./assets/image.png";
import styled, { css } from "styled-components";
import { observer } from "../observer";

export const Post = () => {
  const dangerBtnRef = React.useRef<HTMLButtonElement>(null)
  const normalBtnRef = React.useRef<HTMLButtonElement>(null)


  React.useEffect(() => {
    const dangerBtnEl = dangerBtnRef.current
    const normalBtnEl = normalBtnRef.current

    if (dangerBtnEl === null || normalBtnEl === null) return
    observer.addObserver('firstGroup', {
      element: dangerBtnEl,
      event: 'click',
    })
    observer.addObserver('secondGroup', {
      element: normalBtnEl,
      event: 'click',
    })
    return () => {
      if (dangerBtnEl === null || normalBtnEl === null) return
      observer.clearObservers('firstGroup', {
        element: dangerBtnEl,
        event: 'click',
      })
      observer.clearObservers('secondGroup', {
        element: normalBtnEl,
        event: 'click',
      })
    }
  }, [dangerBtnRef, normalBtnRef])


  return (
    <Wrap>
      <Navigation>
        <Btn ref={dangerBtnRef} danger>Dark side</Btn>
        <Btn ref={normalBtnRef} normal>Light side</Btn>
      </Navigation>
      <Content>
        <Header>What are Gravitational Waves?</Header>
        <Text>
          Gravitational waves are 'ripples' in space-time
          caused by some of the most
          violent and energetic processes in the Universe.
          Albert Einstein predicted the existence of gravitational waves in
          1916 in his general theory of relativity.
          Einstein's mathematics showed that massive
          accelerating objects (such as neutron stars or black holes
          orbiting each other)
          would disrupt space-time in such a way that 'waves' of
          undulating space-time would propagate in all directions away from the source.
          These cosmic ripples would travel at the speed of light,
          carrying with them information about their origins,
          as well as clues to the nature of gravity itself.
          The strongest gravitational waves are produced by
          cataclysmic events such as colliding black holes,
          supernovae (massive stars exploding at the end of
          their lifetimes), and colliding neutron stars.
          Other waves are predicted to be caused by the
          rotation of neutron stars that are not perfect spheres,
          and possibly even the remnants of gravitational
          radiation created by the Big Bang.
          The animation below illustrates how gravitational
          waves are emitted by two neutron
          stars as they orbit each other and then coalesce
          (credit: NASA/Goddard Space Flight Center).
          Note that gravitational waves themselves are invisible. They are made visible here
          to illustrate their propagation away from the source.
          Though Einstein predicted the existence of
          gravitational waves in 1916, the first proof
          of their existence didn't arrive until 1974,
          20 years after his death. In that year,
          two astronomers using the Arecibo Radio
          Observatory in Puerto Rico discovered a binary
          pulsar, exactly the type of system that
          general relativity predicted should radiate
          gravitational waves. Knowing that this
          discovery could be used to test Einstein's
          audacious prediction, astronomers
          began measuring how the stars' orbits
          changed over time. After eight
          years of observations, they determined
          that the stars were getting
          closer to each other at precisely
          the rate predicted by general relativity if they were emitting
          gravitational waves. For a more detailed discussion of this discovery
          and work, see Look Deeper.
        </Text>
        <Image>
          <img alt="waves" src={image} />
        </Image>
      </Content>
    </Wrap>
  )
};

const Wrap = styled.div`
  padding: 16px;
  font-size: var(--base-font-size);
`

const Content = styled.div`
  color: var(--text-color);
  max-width: 800px;
`

const Header = styled.div`
  padding: 20px 0;
  font-size: 1.5em;
`

const Text = styled.div`
  font-size: 1em;
`

const Image = styled.div`
  padding: 16px 0;
  max-width: 500px;
  img {
    width: 100%;
  }
`

const Navigation = styled.div`
  display: flex;
  justify-content: center;
`

type BtnProps = {
  normal?: boolean,
  danger?: boolean,
}

const Btn = styled.button`
  color: var(--text-color);
  background-color: transparent;
  outline:0;
  transition: background-color 0.3s ease-out;
  font-family:  sans-serif;
  border:0;
  padding: 10px 37.5px 10px 37.5px;
  margin-right: 20px;
  &:last-child {
    margin-right: 0;;
  }
  font-size: 1.2em;
  ${(props: BtnProps) => props.normal && css`
    border: 2px solid #2ecc71;
    &:hover {
      background-color: #2ecc71;
    }
    &:active {
      background-color: darken(#2ecc71, 10);
    }
  `}
  ${(props: BtnProps) => props.danger && css`
    border: 2px solid #e74c3c;
    &:hover {
      background-color: #e74c3c;
    }
    &:active {
      background-color: darken(#e74c3c, 10);
    }
  `}
`