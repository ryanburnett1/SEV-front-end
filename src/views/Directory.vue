<template>
  <v-container>
    <v-row><h3>Member Directory:</h3></v-row>
    <v-row>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        outlined
        @change="changeDirectorySearch()"
        clearable
        color="secondary"
      ></v-text-field>
    </v-row>
    <v-col>
      <v-row align="center" justify="center">
        <v-btn-toggle
          v-model="showFamilies"
          rounded
          mandatory
          group
          @change="
            checkPerPage();
            changeShowFamilies();
          "
        >
          <v-btn :value="true">
            Families
          </v-btn>
          <v-btn :value="false">
            People
          </v-btn>
        </v-btn-toggle>
      </v-row>
    </v-col>
    <v-col>
      <v-row>
        <v-col>
          <v-text-field
            v-model.number="pageNumber"
            type="number"
            solo
            single-line
            dense
            color="secondary"
            prefix="Go To Page: "
            @change="checkGoto"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-select
            v-model.number="size"
            color="secondary"
            item-color="secondary"
            :items="[10, 15, 25, 50, 100]"
            type="number"
            solo
            single-line
            dense
            prefix="Items Per Page: "
            @change="checkPerPage"
          ></v-select>
        </v-col>
        <!-- <v-col>
          <v-select
            v-model="showFamilies"
            color="secondary"
            item-color="secondary"
            :items="[
              { text: 'True', value: true },
              { text: 'False', value: false },
            ]"
            type="bool"
            solo
            single-line
            dense
            prefix="Display As Families: "
            @change="checkPerPage"
          ></v-select>
        </v-col> -->
        <v-col>
          <v-select
            v-model="statusFilter"
            color="secondary"
            item-color="secondary"
            :items="
              this.showFamilies ? familyStatusOptions : personStatusOptions
            "
            solo
            single-line
            dense
            prefix="Status: "
            @change="checkPerPage"
          ></v-select>
        </v-col>
      </v-row>
      <v-col>
        <v-pagination
          v-model.number="pageNumber"
          :length="pageCount"
          :total-visible="7"
          @input="nextPage"
          ref="pagin"
        ></v-pagination>
      </v-col>
    </v-col>
    <v-row>
      <v-row v-if="members.length > 0 && !showFamilies" no-gutters>
        <template v-for="(member, i) in filteredData">
          <v-col :key="i">
            <member-card
              class="ma-2"
              :key="member.id"
              :person="member"
              @click.native="
                $router.push({ name: 'MemberView', params: { id: member.id } })
              "
            />
          </v-col>
          <v-responsive
            v-if="i === 2"
            :key="`width-${i}`"
            width="100%"
          ></v-responsive>
        </template>
      </v-row>
      <v-row v-else-if="families.length > 0" no-gutters>
        <template v-for="(family, i) in filteredData">
          <v-col :key="i">
            <family-card
              class="ma-2"
              :key="family.id"
              :family="family"
              @click.native="
                $router.push({ name: 'FamilyView', params: { id: family.id } })
              "
            ></family-card>
          </v-col>
          <v-responsive
            v-if="i === 2"
            :key="`width-${i}`"
            width="100%"
          ></v-responsive>
        </template>
      </v-row>
      <v-row v-else>
        Members Not Found.
        <br />
        Please Check Your Internet Connection and Try Refreshing The Page.
      </v-row>
    </v-row>
    <admin-fab :createFunction="create" />
  </v-container>
</template>

<script>
import AdminFab from "@/components/AdminFab.vue";
import MemberService from "@/services/memberServices";
import rest from "@/services/restServices";
import MemberCard from "@/components/MemberCard.vue";
import FamilyCard from "@/components/FamilyCard.vue";
import Person from "@/models/person.model";
import Family from "@/models/family.model";

export default {
  components: {
    MemberCard,
    FamilyCard,
    AdminFab,
  },
  data() {
    return {
      pageNumber: 1, // current selected page
      size: 25, // number per page
      search: this.$store.getters.getDirectorySearch, // used in filteredData to find members by name
      members: [], // members of the congregation
      families: [], // families of the congregation
      showFamilies: this.$store.getters.isShowFamilies, // if==true show family oriented directory
      statusFilter: "Active", // used in filteredData to find members from status ex: active, disabled, etc.
    };
  },
  computed: {
    familyStatusOptions() {
      return new Family().statusOptions();
    },
    personStatusOptions() {
      return new Person().statusOptions();
    },
    filteredData() {
      let data = [];

      data = this.showFamilies ? this.families : this.members;

      if (this.search !== "Active" && this.search !== null) {
        data = this.showFamilies
          ? data.filter(family =>
              family.name.toLowerCase().includes(this.search.toLowerCase())
            )
          : data.filter(
              member =>
                String(member.preferredFullName())
                  .toLowerCase()
                  .includes(String(this.search).toLowerCase()) ||
                String(member.id)
                  .toLowerCase()
                  .includes(String(this.search).toLowerCase())
            );
      }

      if (this.statusFilter !== "" && this.statusFilter !== undefined) {
        data = this.showFamilies
          ? data.filter(family => family.status == this.statusFilter)
          : data.filter(member => member.status == this.statusFilter);
      }

      return data;
    },
    pageCount() {
      let l = this.showFamilies ? this.families.length : this.members.length;
      let s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size - this.size;
      const end = start + this.size;
      return this.showFamilies
        ? this.families.slice(start, end)
        : this.members.slice(start, end);
    },
  },
  methods: {
    changeShowFamilies() {
      this.$store.commit("setShowFamilies", this.showFamilies);
    },
    changeDirectorySearch() {
      this.$store.commit("setDirectorySearch", this.search);
      console.log("Updated")
    },
    // goto page to create new family
    addFamily() {
      this.$router.push({
        name: "FamilyEdit",
        params: { id: 0, isAdd: true },
      });
    },
    // goto page to create new user, member/person
    addUser() {
      this.$router.push({
        name: "MemberEdit",
        params: { id: 0, isAdd: true },
      });
    },
    // sentinal for above functions
    create() {
      if (this.showFamilies) {
        this.addFamily();
      } else {
        this.addUser();
      }
    },
    // get next slice from paginated data
    nextPage(page) {
      this.pageNumber = parseInt(page);
    },
    // below functions ensure correct data for input fields
    checkPerPage() {
      this.pageNumber = 1;
    },
    checkGoto() {
      this.pageNumber = Math.max(1, Math.min(this.pageNumber, this.pageCount));
    },
  },
  mounted() {
    // get all members of the congregation
    MemberService.getAll().then(response => {
      response.data.data.forEach(element => {
        let person = new Person(element);
        this.members.push(person);
      });
    });

    // get all families in the congregation
    rest.getAll("/family").then(response => {
      response.data.data.forEach(family => {
        this.families.push(new Family(family));
      });

      if (this.families.length <= 0) {
        this.showFamilies = false;
      }
    });
  },
};
</script>

<style></style>
