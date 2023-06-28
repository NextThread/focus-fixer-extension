<template>
  <div class="info-content">
    <div class="info-header">
      <div class="logo"/>
      <div>
        <div class="info-app-title">Focus Fixer</div>
        <div class="info-app-version">Version 1.0.0</div>
      </div>
    </div>
    <div class="about">
      <p>About FocusFixer</p>
      <div>
        FocusFixer is a flexible productivity tool that helps with
        tracking and management of time spent on your mostly liked coding platforms,
        with screen-time.
        <!-- you can set a daily time cap or use the more flexible
        time-blocking scheduler, all from a simple, intuitive interface -->
      </div>
    </div>
    <div class="contributors">
      <p>Contributor</p>
      <div class="box">
        <contributor :details="contributors[0]">
          <img src="../../assets/images/anurag.png" />
        </contributor>
        <!-- <contributor class="second-contributor" :details="contributors[1]">
          <img src="../../assets/images/femiabolaji.png" />
        </contributor> -->
      </div>
    </div>
    <!-- <p class="acknowledgment">Special thanks to Remix Icons. Your icons made this pop</p> -->
  </div>
</template>

<script>
import Contributor from './Contributor';

export default {
  name: 'Info',
  components: {
    Contributor
  },
  computed: {
    contributors() {
      return [
        {
          name: 'Anurag Roy',
          linkedIn: 'https://www.linkedin.com/in/anurag31oct/https://twitter.com/femiodtexe',
          github: 'https://github.com/NextThread',
          twitter: 'https://twitter.com/nextthread__',
          // instagram: 'https://www.instagram.com/anurag31oct'
        },
      ];
    }
  }
};
</script>

<style scoped>
.info-content {
  padding: 24px;
}

.info-header {
  display: flex;
}


.info-header .logo {
  background: url("../../assets/images/icon_161.png");
  background-repeat: no-repeat;
  background-position: center center;
  width: 37px;
  height: 35px;
  margin-right: 15px;
}

.dark-mode .info-header .logo {
  background: url("../../assets/images/icon_161.png");
  background-repeat: no-repeat;
  background-position: center center;
}

.info-app-title {
  font-size: 16px;
  font-weight: bold;
}

.info-app-version {
  color: #4F4F4F;
  font-size: 12px;
}

.about {
  margin-top: 34px;
}

.about p, .contributors p {
  font-weight: bold;
  font-size: 12px;
}

.about div {
  font-size: 12px;
  line-height: 20px;
  color: #4F4F4F;
}

.dark-mode .about div, .dark-mode .acknowledgment, .dark-mode .info-app-version {
  color: #BDBDBD;
}

.contributors {
  margin-top: 32px;
}

.second-contributor {
  margin-left: 54px;
}

.acknowledgment {
  margin-top: 32px;
  font-size: 12px;
  color: #4F4F4F;
}
</style>
