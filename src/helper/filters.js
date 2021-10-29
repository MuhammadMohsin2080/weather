import Vue from "vue";
import moment from 'moment'

Vue.filter('formatHMA', function (value) {
    if (value) {
        return moment(String(value)).format('hh:mm A')
    }
});

Vue.filter('formatMDDY', function (value) {
    if (value) {
        return moment(String(value)).format('DD-MMM-YYYY hh:mm A')
    }
});