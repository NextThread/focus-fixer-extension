<template>
  <div>
    <div class="modal-bg" />
    <div v-if="config.title" class="advanced-app-settings">
      <div class="modal-header">
        <router-link to="/app"><close-icon class="close-advanced" /></router-link>
      </div>
      <div class="modal-content">
        <collapsible :open="true">
          <template #title>
            <h3 class="collapsible-title">Basic</h3>
          </template>
          <form class="form" @submit.prevent="update">
            <div class="input-field">
              <label>Title <span class="italize">(A name or description of the app)</span></label>
              <input v-model="config.title" type="text" />
            </div>
            <div class="input-field">
              <label>URL <span class="italize">(example: https://www.some-app-title.com)</span></label>
              <input type="text" disabled :value="config.url" />
            </div>
            <div class="input-field">
              <label>Daily Limit <span class="italize">(in minutes)</span></label>
              <input
                v-model="config.time"
                type="number"
                min="0"
                max="1440" />
            </div>
            <div class="save-section box between">
              <color-picker v-model="config.color" />
              <button type="submit" class="btn dark save-btn" :disabled="isSaving">
                <save-icon class="save-icon" />{{ buttonCaption }}
              </button>
            </div>
          </form>
        </collapsible>
        <collapsible :open="true" class="advanced-section">
          <template #title>
            <h3 class="collapsible-title">Advanced</h3>
          </template>
          <div>
            <p class="advanced-more">
              Advanced setting lets you choose and add
              custom time blocks to days of the week
            </p>
            <time-blocks
              :config-days="config.days || {}"
              :is-saving="isSaving"
              @update-days-blocks="updateDaysBlocks"
            />
          </div>
        </collapsible>
      </div>
    </div>
  </div>
</template>

<script>
import utils, { CONFIGKEY, days } from '../../assets/js/utils';
import Collapsible from '../atoms/Collapsible';
import TimeBlocks from './TimeBlocks';
import ColorPicker from '../atoms/ColorPicker';
import SaveIcon from '../atoms/Icons/Save';
import CloseIcon from '../atoms/Icons/Close';

export default {
  name: 'Settings',
  components: {
    SaveIcon,
    Collapsible,
    TimeBlocks,
    ColorPicker,
    CloseIcon
  },
  data() {
    return {
      sites: {},
      name: '',
      config: {},
      daysChoosen: [],
      isSaving: false
    };
  },
  computed: {
    isTimeframeInvalid() {
      return this.daysChoosen.some(({ from, to }) => to < from);
    },
    buttonCaption() {
      return this.isSaving ? 'Saving...' : 'Save';
    }
  },
  async mounted() {
    this.name = this.$route.params.name;
    const allSites = await utils.getData(CONFIGKEY);
    this.sites = allSites;
    this.config = {
      ...this.sites[this.name],
      title: this.sites[this.name].title || this.name
    };
    days.forEach((eachDay) => {
      if (this.config.days && eachDay in this.config.days) {
        this.config.days[eachDay].forEach((timeFrame) => {
          this.daysChoosen.push({
            name: eachDay,
            from: timeFrame.from,
            to: timeFrame.to,
            active: true
          });
        });
      } else {
        this.daysChoosen.push({
          name: eachDay,
          active: false
        });
      }
    });
  },
  methods: {
    async update() {
      this.isSaving = true;
      this.config.control = true;
      this.sites[this.name] = this.config;
      await utils.saveConfiguration(CONFIGKEY, this.sites);
      this.endSave();
    },
    updateDaysBlocks(daysBlocks) {
      this.config = {
        ...this.config,
        days: daysBlocks
      };
      this.update();
    },
    endSave() {
      setTimeout(() => {
        this.isSaving = false;
      }, 1500);
    },
    async addTimeFrame() {
      this.config.days = {};
      this.daysChoosen.forEach(({
        active, name, from, to
      }) => {
        if (active) {
          if (!this.config.days[name]) {
            this.config.days[name] = [];
          }
          this.config.days[name].push({
            from,
            to
          });
        }
      });
      await this.update();
      this.$router.push('/app');
    }
  }
};
</script>

<style>
.advanced-app-settings {
  background: var(--bg);
  color: var(--text-color);
  z-index: 1;
  position: relative;
  border-radius: 8px;
  margin: 0 20px 20px 20px;
}

.modal-header {
  display: flex;
  justify-content: flex-end;
  height: 50px;
  align-items: center;
}

.modal-content {
  max-height: 482px;
  overflow-y: auto;
  padding: 0px 40px 50px;
}

.modal-header .close-advanced {
  height: 16px;
  width: 16px;
  margin-right: 20px;
}

.close-advanced path {
  fill: var(--text-color);
}

.advanced-header {
  margin-bottom: 8px;
}

.collapsible-title {
  font-size: 16px;
}

.save-section {
  margin-top: 24px;
}

.save-section .save-btn {
  padding: 7px 20px;
}

.advanced-section {
  margin-top: 32px;
}

.advanced-more {
  margin-top: 12px;
  font-size: 12px;
  color: #828282;
}

.modal-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}
</style>
