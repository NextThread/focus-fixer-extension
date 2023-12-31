<template>
  <div class="content" @keyup.alt.84="toggleAll" tabindex="0">
    <div class="apps-header">
      <div class="stats">
        <span class="timers-caption">Timers</span>
        <div class="count">{{count}}</div>
      </div>
      <v-select
        v-model="filterValue"
        class="filter"
        :options="options"
        :clearable="false"
      >
        <template #open-indicator="{ attributes }">
          <span v-bind="attributes"><filter-icon /></span>
        </template>
      </v-select>
    </div>
    <div class="app-list">
        <each-app
          v-for="(each, key) in filteredSites"
          :key="key"
          :siteKey="key"
          :details="each"
          :time="time[key]"
          @remove="remove"
          @update="update" />
    </div>
    <div class="apps-footer">
      <button class="btn toggle-all" @click="toggleAll">
        {{ toggleAllCaption }}
        <div class="shortcut">Alt  + T</div>
      </button>
      <router-link to="/add" class="btn dark add-timer">
        <timer />
        Add timer
      </router-link>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select';
import EachApp from './EachApp';
import Timer from '../atoms/Icons/Timer';
import FilterIcon from '../atoms/Icons/Filter';
import utils, { CONFIGKEY, DATAKEY } from '../../assets/js/utils';
import 'vue-select/dist/vue-select.css';

export default {
  name: 'Settings',
  components: {
    EachApp,
    Timer,
    vSelect,
    FilterIcon
  },
  data() {
    return {
      sites: {},
      time: {},
      saveStatus: 0,
      filterValue: 'All'
    };
  },
  computed: {
    options() {
      return ['All', 'Active', 'Idle'];
    },
    count() {
      const keys = Object.keys(this.filteredSites);
      return keys.length;
    },
    attributes() {
      return {
        ref: 'openIndicator',
        role: 'presentation',
        class: 'vs__open-indicator'
      };
    },
    filteredSites() {
      if (this.filterValue === 'All') {
        return this.sites;
      }
      const sites = { ...this.sites };
      Object.keys(sites).forEach((key) => {
        if ((this.filterValue === 'Active' && !sites[key].control)
         || (this.filterValue === 'Idle' && sites[key].control)) {
          this.$delete(sites, key);
        }
      });
      return sites;
    },
    isMostSitesOn() {
      const keys = Object.keys(this.sites);
      const sitesOn = keys.filter(each => this.sites[each].control)
      return sitesOn.length > keys.length / 2
    },
    toggleAllCaption() {
      if (this.isMostSitesOn) {
        return "Disable All"
      }
      return "Enable All"
    }
  },
  async mounted() {
    [this.sites, this.time] = await Promise.all([utils.getData(CONFIGKEY), utils.getData(DATAKEY)]);
    const currentDate = utils.getCurrentDate();
    this.time = this.time[currentDate] || {};
  },
  methods: {
    async update(siteKey, control) {
      this.$set(this.sites, siteKey, {
        ...this.sites[siteKey],
        control
      });
      await utils.saveConfiguration(CONFIGKEY, this.sites);
    },
    async remove(key) {
      this.$delete(this.sites, key);
      await utils.saveConfiguration(CONFIGKEY, this.sites);
    },
    toggleAll() {
      const isMostSitesOn = this.isMostSitesOn;
      Object.keys(this.sites).forEach((each) => {
        this.update(each, !isMostSitesOn);
      });
    }
  }
};
</script>

<style>
.app-title {
  font-size: 16px;
}

.timers-caption {
  font-weight: bold;
}

.apps-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.apps-header .action {
  display: flex;
  align-items: center;
}

.stats {
  display: flex;
  align-items: center;
}

.count {
  padding: 0 5px;
  border-radius: 4px;
  background: #F2F2F2;
  margin-left: 8px;
}

body.dark-mode .count {
  background: #828282;
}

.app-list {
  margin-top: 32px;
  width: 100%;
  border-top: 1px solid #E0E0E0;
}

.apps-footer {
  margin-top: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.apps-footer .toggle-all {
  color: var(--active_link);
  border-color: #E0E0E0;
}

.apps-footer .btn {
  display: flex;
  height: 30px;
  align-items: center;
  padding: 0 6px;
  font-size: 12px;
}

.apps-footer .btn .shortcut {
  padding: 2px 6px;
  color: #EB5757;
  background: #FCE8E8;
  margin-left: 12px;
  border-radius: 4px;
}

.apps-footer .btn.add-timer {
  padding: 8px;
}

.filter {
  color: var(--text-color);
}

.filter .vs__selected {
  color: var(--text-color);
}

.filter .vs__dropdown-toggle {
  border-radius: 0;
  border: 0;
  border-bottom: 1px solid var(--active_link);
  padding-bottom: 8px;
}

.filter .vs__selected-options {
  width: 100px;
}

.filter .vs__dropdown-menu {
  right: 0;
  left: auto;
  padding: 0px;
}

.filter .vs__open-indicator {
  fill: var(--icon_default);
}

/* .list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 0.3s;
}
.list-enter, .list-leave-to {
  opacity: 0;
} */

.modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  background: rgba(0, 0, 0, 0.3);
}

.edit-modal {
  margin: 71px 21px;
  border-radius: 8px;
  background: var(--bg);
}
</style>
