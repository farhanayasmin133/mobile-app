import Framework7 from 'framework7/framework7.esm.bundle';
import $$ from 'dom7';
import firebase from 'firebase/app';
import app from "./F7App.js";
import 'firebase/database';
import 'firebase/auth';



$$("#tab2").on("tab:show", () => {
    //put in firebase ref here
    const sUser = firebase.auth().currentUser.uid;
    //Reading from Database
    firebase.database().ref("crudItems/" + sUser).on("value", (snapshot) =>{
        const oItems = snapshot.val();
        const aKeys = Object.keys(oItems);
        $$("#itemList").html("");
        for(let n = 0; n < aKeys.length; n++){
            let itemName= oItems[aKeys[n]].item;
            if(oItems[aKeys[n]].datePurchased){
                itemName = `<del>${itemName}</del>`
            }
            
            let sCard = `
            <div class="card">
                <div class="card-content card-content-padding"><img src="${oItems[aKeys[n]].url}" height="50" width="50"></div>
                <div class="card-content card-content-padding"><strong>Item Name:</strong> &nbsp;&nbsp;${itemName},&nbsp;&nbsp;<strong>Price:</strong> ${oItems[aKeys[n]].price}
                <div class="row" style="justify-content: flex-start">&nbsp;
								<p class="segmented segmented-raised">
									<button class="button purchase" id="pur_${aKeys[n]}">I bought this</button>
									<button class="button delete"
                                    id="del_${aKeys[n]}">I don't need this</button>
								</p>
					</div>
                </div>
            </div>
            `;
            $$("#itemList").append(sCard);

            $$(".card button").on("click", evt =>{
                const sUserId = firebase.auth().currentUser.uid;
                if(hasClass(evt.target, "delete")){
                   
                    //alert("Delete button clicked" + evt.target.id);
                    //console.log(evt);
                    firebase.database().ref("crudItems/"+ sUserId + "/"+ evt.target.id.replace("del_", "")).remove();
                }
                else if(hasClass(evt.target, "purchase")){
                    //adding datePurchased as an new attribute here in Firebase
                
                    const sPurchaseDate = new Date().toISOString().replace('.', '_');
                    

                    firebase.database().ref("crudItems/" + sUserId + "/" + evt.target.id.replace("pur_", "")+"/datePurchased").set(sPurchaseDate);
                }
            });
        }
    });

});

$$(".my-sheet").on("submit", e => {
    //submitting a new note
    //inserting in Db
    e.preventDefault();
    const oData = app.form.convertToData("#addItem");
    //Getting the user id here
    const sUser = firebase.auth().currentUser.uid;
    const sId = new Date().toISOString().replace(".", "_");

    //inserting in Database
    firebase.database().ref("crudItems/" + sUser + "/" + sId).set(oData);
    app.sheet.close(".my-sheet", true);
});

function hasClass(elem, className){
    return elem.classList.contains(className);
}

