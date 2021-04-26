<template>
  <v-container>
    <v-btn @click="generateDirectory">Generate Persons Directory</v-btn>
  </v-container>
</template>

<script>
import Person from "@/models/person.model";
import Family from "@/models/family.model";
import Group from "@/models/group.model";
import MemberService from "@/services/memberServices";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  data() {
    return {
      person: new Person({
        address: "",
        firstName: "",
        lastName: "",
        middleName: "",
        preferredName: "",
        phoneCell: "",
        picture: "ryanj_profile.jpg",
        birthday: "",
        sex: "",
        marital_status: "",
        status: "",
        title: "",
        receiveAnnouncements: true,
        skill: [], //skill objects
      }),
      family: new Family({
        address: "",
        email: "",
        members: [], // person IDs
        name: "",
        phone: "",
        picture: "",
        status: "",
      }),
      group: new Group({
        name: "",
        person: [], // person objects
        picture: "",
      }),
      skill: false,
    };
  },
  methods: {
    async generateDirectory() {
      //pdf format vars
      let itemsPerRow = 3;
      let maxImgWidth = 200;
      let maxImgHeight = 100;
      let numTextLines = 6;

      //todo: possibly put placeholder picture when no picture
      let persons = await new Promise(resolve => {
        MemberService.getAll().then(response => {
          resolve(response.data.data);
        });
      });
      for (let i = 0; i < persons.length; i++) {
        persons[i] = new Person(persons[i]);
        if (!persons[i].phoneCell || persons[i].phoneCell == "") {
          persons[i].phoneCell = "No Phone";
        }
        if (!persons[i].address || persons[i].address == "") {
          persons[i].address = "No Address";
        }
      }
      // let l = persons.length;
      // for (let i = 0; i < l; i++) {
      //   persons.push(persons[i]);
      // }
      console.log(persons);
      let picturePromises = [];
      let pictures = [];
      for (let i = 0; i < persons.length; i++) {
        if (!persons[i].picture || persons[i].picture == "") {
          picturePromises.push(
            new Promise(resolve => {
              resolve("");
            })
          );
        } else {
          picturePromises.push(
            getImgFromUrl(
              persons[i].getPicturePath(),
              maxImgWidth,
              maxImgHeight
            )
          );
        }
      }
      await Promise.all(picturePromises).then(values => {
        pictures = values;
      });

      //pdf generation vars
      let options = { orientation: "p", unit: "px" };
      let doc = new jsPDF(options);
      let textYOffset = 10;
      let fontLineSize = textYOffset + 4;
      let docWidth = doc.internal.pageSize.getWidth();
      let docHeight = doc.internal.pageSize.getHeight();
      let sizePerRow = maxImgHeight + fontLineSize * numTextLines;
      let sizePerCol = docWidth / itemsPerRow;
      let pageStartY = 10;
      let yPos = pageStartY;
      let xPos = 0;

      let itemCounter = 0;
      for (let i = 0; i < persons.length; i++) {
        //handle the items per row logic
        if (itemCounter >= itemsPerRow) {
          itemCounter = 0;
          yPos += sizePerRow;
          xPos = 0;
          if (yPos + sizePerRow > docHeight) {
            doc.addPage();
            yPos = pageStartY;
          }
        }
        //insert the item
        if (pictures[i] != "") {
          let img = pictures[i];
          let imgPosX = xPos + 0.5 * sizePerCol - 0.5 * img.width;
          doc.addImage(img, "JPEG", imgPosX, yPos, img.width, img.height);
        }
        let textY = maxImgHeight + textYOffset;
        let textX = xPos + 0.5 * sizePerCol;
        let textOptions = { align: "center", maxWidth: `${sizePerCol - 20}` };
        doc.text(persons[i].fullName(), textX, yPos + textY, textOptions);
        doc.text(
          persons[i].phoneCell,
          textX,
          yPos + textY + fontLineSize,
          textOptions
        );
        doc.text(
          persons[i].address,
          textX,
          yPos + textY + 2 * fontLineSize,
          textOptions
        );

        itemCounter++;
        xPos += sizePerCol;
      }
      //save the document
      doc.save("Directory.pdf");
    },
  },
};

function getImgFromUrl(url, maxWidth, maxHeight) {
  return new Promise(resolve => {
    var img = new Image();
    img.src = url;
    img.onload = function() {
      if (maxWidth && maxHeight) {
        if (img.height > maxHeight) {
          img.width *= maxHeight / img.height;
          img.height *= maxHeight / img.height;
        }
        if (img.width > maxWidth) {
          img.width *= maxWidth / img.width;
          img.height *= maxWidth / img.width;
        }
      }
      resolve(img);
    };
  });
}
</script>
