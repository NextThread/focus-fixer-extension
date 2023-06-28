const data = {
  timer: {
    '2021-10-03': {
      instagram: 2000,
      youtube: 2240,
      linkedin: 2000,
      codeforces: 5000,
      codechef: 4000,
      leetcode : 6000,
      atcoder : 5000,
      geeksforgeeks: 5000,
      codingninjas: 5000,
      hackerearth: 5000,
      hackerrank: 5000,
      twitter: 2000,
      facebook: 1800,
      github: 1800,
      google: 1000
    }
  },
  sites: {
    facebook: {
      control: true,
      days: {
        friday: [
          {
            from: '09:00',
            to: '17:00'
          }
        ],
        monday: [
          {
            from: '09:00',
            to: '17:00'
          }
        ],
        thursday: [
          {
            from: '09:00',
            to: '17:00'
          }
        ],
        tuesday: [
          {
            from: '09:00',
            to: '17:00'
          }
        ],
        wednesday: [
          {
            from: '09:00',
            to: '17:00'
          }
        ]
      },
      time: '10',
      url: '*://*.facebook.com/'
    },
    instagram: {
      control: true,
      days: {
        friday: [
          {
            from: '09:00',
            to: '17:00'
          }
        ],
        monday: [
          {
            from: '09:00',
            to: '17:00'
          }
        ],
        thursday: [
          {
            from: '09:00',
            to: '17:00'
          }
        ],
        tuesday: [
          {
            from: '09:00',
            to: '17:00'
          }
        ],
        wednesday: [
          {
            from: '09:00',
            to: '17:00'
          }
        ]
      },
      time: '10',
      url: '*://*.instagram.com/'
    },
    netflix: {
      control: true,
      time: 0,
      url: 'https://netflix.com'
    },
    twitter: {
      control: true,
      days: {
        friday: [
          {
            from: '09:00',
            to: '17:00'
          }
        ],
        monday: [
          {
            from: '09:00',
            to: '17:00'
          }
        ],
        thursday: [
          {
            from: '09:00',
            to: '17:00'
          }
        ],
        tuesday: [
          {
            from: '09:00',
            to: '17:00'
          }
        ],
        wednesday: [
          {
            from: '09:00',
            to: '17:00'
          }
        ]
      },
      time: '10',
      url: '*://*.twitter.com/'
    },
    youtube: {
      control: false,
      time: '60',
      url: '*://*.youtube.com/'
    }, 
    linkedin: {
      control: false,
      time: '60',
      url: '*://*.linkedin.com/'
    },
    codeforces: {
      control: false,
      time: '60',
      url: '*://*.codeforces.com/'
    },
    codechef: {
      control: false,
      time: '60',
      url: '*://*.codechef.com/'
    },
    leetcode: {
      control: false,
      time: '60',
      url: '*://*.leetcode.com/'
    },
    atcoder: {
      control: false,
      time: '60',
      url: '*://*.atcoder.com/'
    },
    geeksforgeeks: {
      control: false,
      time: '60',
      url: '*://*.geeksforgeeks.org/'
    },
    codingninjas: {
      control: false,
      time: '60',
      url: '*://*.codingninjas.com/'
    },
    hackerearth: {
      control: false,
      time: '60',
      url: '*://*.hackerearth.com/'
    },
    hackerrank: {
      control: false,
      time: '60',
      url: '*://*.hackerrank.com/'
    }
  },
  settings: {
    theme: 'flash'
  }
};

export default {
  get(key, callback) {
    callback(data);
  },
  set(details, callback) {
    const key = Object.keys(details)[0];
    data[key] = details[key];
    callback();
  }
};
