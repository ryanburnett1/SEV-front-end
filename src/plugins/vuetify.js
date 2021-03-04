import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

import colors from "vuetify/lib/util/colors";

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.blue.darken4, // #E53935
        //secondary: colors.red.lighten4, // #FFCDD2
        // error: #000
        // info: #000
        // success: #000
        // warning: #000
        accent: colors.indigo.base, // #3F51B5
        background: colors.indigo.lighten4,
      },
      dark: {
        
        primary: "#1B2D33", // #E53935
        secondary: "#576369",
        // error: #000
        // ifno: #000
        // success: #000
        // warning: #000
        accent: "#A9AF27", // #3F51B5
        background: "#15303B",
      }
    },
    options: { customProperties: true },
    dark: true,
  },
});
