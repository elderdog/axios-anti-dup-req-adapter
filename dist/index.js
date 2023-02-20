import axios from 'axios';

var adapter = function (config) {
    console.log('>>> using custom adapter');
    return axios.defaults.adapter(config);
};

export { adapter as default };
