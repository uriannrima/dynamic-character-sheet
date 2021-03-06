<template>
  <div class="main-container">
    <front class="page front" />
    <cover class="page cover" />
  </div>
</template>

<script>
import * as Pages from './pages';
import Store from 'store';
import { mapState, mapActions, Actions } from '../../store/CharacterModule';

const loadCharacter = async function (to, from, next) {
  const characterId = to.params.id;
  if (!characterId) {
    await Store.dispatch('CharacterModule/newCharacter');
  } else {
    await Store.dispatch('CharacterModule/loadCharacter', characterId);
    await Store.dispatch('CharacterModule/connect', characterId);
  }
  next();
};

export default {
  components: Pages,
  beforeRouteEnter: loadCharacter,
  beforeRouteUpdate: loadCharacter,
  computed: {
    ...mapState(['_id'])
  },
  methods: {
    ...mapActions([Actions.loadCharacter, Actions.newCharacter, 'connect'])
  }
}
</script>

<style>
@page {
  size: A4;
  margin: 0;
}

.main-container {
  margin: 0 auto;
  padding: 0 15px;
  background: white;
}

/** HD Resolution */

/* @media screen and (min-width: 1440px) {
  .main-container {
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .main-container > div {
    width: 50%;
  }
} */

/** Common Desktop Resolution */

@media screen and (min-width: 1024px) {
  .main-container {
    width: 1280px;
  }

  .page {
    margin-bottom: 15px;
  }
}

/** Tablet Resolution */

@media screen and (min-width: 768px) and (max-width: 1023px) {
  .main-container {
    width: 768px;
  }
}

/** Mobile Resolution */

@media screen and (min-width: 568px) and (max-width: 767px) {
  .main-container {
    width: 568px;
  }
}

/** Small Mobile Resolution */

@media screen and (max-width: 567px) {
  .main-container {
    width: 360px;
  }
}

/** Global CSS */

.debug {
  background-color: rgb(255, 0, 255);
}

.black-box {
  display: grid;
  text-align: center;
  align-items: center;
  background-color: black;
  color: white;
  width: 100%;
  height: 100%;
}

.black-box label {
  text-transform: uppercase;
  font-weight: bolder;
  display: inline-block;
}

.left-icon {
  float: left;
  margin-left: 5px;
  margin-top: 2px;
}

.right-icon {
  float: right;
  margin-right: 5px;
  margin-top: 2px;
}

.black-box label:nth-child(1) {
  font-size: 95%;
}

.black-box label:nth-child(2) {
  font-size: 50%;
}

.new-black-box {
  color: white;
  background-color: black;
}

.new-black-box > label {
  display: block;
  text-transform: uppercase;
  text-align: center;
  font-weight: bolder;
}

.lower-border {
  border-bottom: 1px solid white;
}

.rounded {
  border-radius: 5px 5px 0px 0px;
}

.temporary-box {
  text-align: center;
  background-color: lightgray;
}

.only-bottom {
  border-width: 0 0 1px 0 !important;
  border-bottom: solid 1px black;
}

.descriptor {
  font-weight: bold;
  text-transform: uppercase;
}

.common-textarea {
  width: 100%;
  height: 100%;
  padding-top: 5px;
}

/** VTooltip */
.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
  font-size: 75%;
  font-weight: bolder;
}

/** Core CSS */

html,
button,
input,
select,
textarea {
  font-family: "Source Sans Pro", sans-serif !important;
}

html {
  box-sizing: border-box;
}

*,
*:after,
*:before {
  box-sizing: border-box;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0;
  /* <-- Apparently some margin are still there even though it's hidden */
}

input[type="number"] {
  text-align: center;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[readonly] {
  background-color: #ccc;
}

.attention {
  background-color: yellow;
}

textarea {
  resize: none;
}

/** Utils */

/** Hide on Large */

@media screen and (max-width: 1439px) {
  .h-lg-down {
    display: none !important;
  }
}

@media screen and (min-width: 1024px) {
  .h-lg-up {
    display: none !important;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1439px) {
  .h-lg-only {
    display: none !important;
  }
}

/** Hide on Medium */

@media screen and (max-width: 1023.5px) {
  .h-md-down {
    display: none !important;
  }
}

@media only screen and (min-width: 768px) {
  .h-md-up {
    display: none !important;
  }
}

@media screen and (min-width: 768px) and (max-width: 1023.5px) {
  .h-md-only {
    display: none !important;
  }
}

/** Hide on Small */
@media screen and (max-width: 767px) {
  .h-sm-down {
    display: none !important;
  }
}

@media screen and (min-width: 360px) {
  .h-sm-up {
    display: none !important;
  }
}

@media screen and (min-width: 360px) and (max-width: 767px) {
  .h-sm-only {
    display: none !important;
  }
}
</style>
