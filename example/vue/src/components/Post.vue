<template>
  <div class="post">
    <div class="navigation">
      <button class="navigation__btn navigation__btn--danger targer_group_1">Dark side</button>
      <button class="navigation__btn navigation__btn--normal targer_group_2">Light side</button>
    </div>
    <div class="post__content">
      <h1 class="post__header">What are Gravitational Waves?</h1>
      <div class="post__text">
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
      </div>
      <div class="post__image">
        <img src="@/assets/image.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss">
  $button-padding: 15px;
  $green: #2ecc71;
  $red: #e74c3c;

  .post {
    padding: 16px;
    font-size: var(--base-font-size);
    &__content {
      color: var(--text-color);
      max-width: 800px;
    }
    &__header {
      padding: 20px 0;
      font-size: 1.5em;
    }
    &__text {
      font-size: 1em;
    }
    &__image {
      padding: 16px 0;
      max-width: 500px;
      img {
        width: 100%;
      }
    }
  }

  .navigation {
    display: flex;
    justify-content: center;
    &__btn {
      color: var(--text-color);
      background-color: transparent;
      outline:0;
      transition: background-color 0.3s ease-out;
      font-family:  sans-serif;
      border:0;
      padding: $button-padding/1.5 $button-padding*2.5 $button-padding/1.5 $button-padding*2.5;
      margin-right: 20px;
      &:last-child {
        margin-right: 0;;
      }
      font-size: 1.2em;
      &--normal {
        border: 2px solid $green;
        &:hover {
          background-color: $green;
        }
        &:active {
          background-color: darken($green, 10);
        }
      }
      &--danger {
        border: 2px solid $red;
        &:hover {
          background-color: $red;
        }
        &:active {
          background-color: darken($red, 10);
        }
      }
    }
  }
</style>
