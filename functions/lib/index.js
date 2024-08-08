"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onSchedulerCurrencyHandler = exports.onSchedulerAlarmHandler = exports.onSchedulerHandler = exports.onDeleteHandler = exports.onCreateHandler = void 0;
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const app_1 = require("firebase/app");
const lite_1 = require("firebase/firestore/lite");
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const moment = require("moment");
const request = require("request");
const firebaseConfig = {
    apiKey: "AIzaSyDPwjVADwnQg0QyAnHdTiHQwuyZgFPjOj0",
    authDomain: "eventbrite-e4885.firebaseapp.com",
    databaseURL: "https://eventbrite-e4885-default-rtdb.firebaseio.com",
    projectId: "eventbrite-e4885",
    storageBucket: "eventbrite-e4885.appspot.com",
    messagingSenderId: "590781300622",
    appId: "1:590781300622:web:4a9ec5cde04f96c17caedf",
    measurementId: "G-J3MGT4MNVC",
};
let alarm = {
    topic: "nx_alarms",
    data: {
        action: "update",
    },
};
// Initialize Firebase
const appFirebase = (0, app_1.initializeApp)(firebaseConfig);
admin.initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = (0, lite_1.getFirestore)(appFirebase);
const storage = admin.storage();
const bucketName = "gs://eventbrite-e4885.appspot.com/";
let interval = 0;
// app.use(json());
// import { AngularFirestoreCollection } from "@angular/fire/compat/firestore";
// let itemsCollection: AngularFirestoreCollection<ModelUserNox>;
/** Create Transport for Email */
const mailTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "hello.eventbrite@gmail.com",
        pass: "hmqqhuqeicmdxzpn",
    },
});
/** Function to notify user creation */
const onCreate = functions.auth.user().onCreate(async (user) => {
    const mailOptions = {
        from: "Nox46<noreply@firebase.com>",
        to: user.email,
        subject: "Welcome to Nox46!",
        html: `<body
    style="
      width: calc(50vw - 2rem) !important;
      min-width: calc(50vw - 2rem) !important;
      box-sizing: border-box;
      overflow-x: hidden;
      margin: 0 auto;
    "
  >
    <!-- Header -->
    <section
      style="
        width: calc(100% - 0rem);
        min-width: calc(100% - 0rem);
        box-sizing: border-box;
        margin-top: 1.5rem;
      "
    >
      <!-- <div class="triggerHeaderInmersive"></div> -->
      <div
        style="
          width: calc(100% - 2rem) !important;
          background-color: white;
          margin: 0 auto;
          border-radius: 1.5em !important;
          overflow: hidden;
          position: relative;
          padding-top: 1rem;
          padding-bottom: 1rem;
          padding-left: 0;
          padding-right: 0;
          box-sizing: border-box;
          box-shadow: 0px 0px 88px -14px rgba(0, 0, 0, 1) !important;
        "
      >
        <img
          fetchpriority="high"
          width="200"
          height="100"
          src="https://firebasestorage.googleapis.com/v0/b/eventbrite-e4885.appspot.com/o/main%2Fweb%2Fmain%2Ficon-384x384.png?alt=media&token=07cdbf30-0fa5-40cc-a5ba-2e0c5112bfad"
          style="
            width: 100%;
            height: 5vh;
            object-fit: contain;
            margin: 0 auto !important;
          "
        />
        <div style="width: 90%; margin: 0 auto">
          <p
            style="
              font-size: 18px !important;
              font-weight: 700 !important;
              color: #f25514 !important;
              text-align: center !important;
              margin-bottom: 1rem;
              font-family: system-ui;
            "
          >
            WELCOME TO NOX46!
          </p>
          <h2
            style="
              margin-top: 0.5em !important;
              margin-bottom: 1em !important;
              font-size: 24px !important;
              text-align: center;
              color: rgb(75, 75, 75);
              font-family: system-ui;
            "
          >
            ¡Plan and manage all your social events with Nox46!
          </h2>
          <div>
            <p
              style="
                width: 100%;
                font-size: 17px !important;
                font-family: system-ui;
                text-align: center !important;
              "
            >
              We are excited to have you on board to discover a new world of
              possibilities for your events. From event creation to custom
              website management, we're here to make your experience
              exceptional.
            </p>
            <p
              style="
                width: 100%;
                font-size: 17px !important;
                text-align: center !important;
                font-family: system-ui;
              "
            >
              With Nox46, you can forget about complications and focus on what
              really matters: creating unforgettable moments for your audience.
              Start exploring all the exciting features we have to offer!
            </p>
            <div
              style="
                width: 100% !important;
                min-width: 100% !important;
                margin: 2.5rem auto 0 auto;
              "
            >
              <a href="https://blog.nox46.com">
                <button
                  style="
                    border-radius: 1em !important;
                    min-width: 8.5rem !important;
                    width: 100% !important;
                    padding: 0em 0.25em !important;
                    border: 0 solid transparent;
                    background: transparent;
                    border: 1px solid #f25514;
                  "
                >
                  <h2
                    style="
                      color: black;
                      font-size: 16px !important;
                      font-weight: 400 !important;
                      font-family: system-ui;
                    "
                  >
                    Blog
                  </h2>
                </button></a
              >
              <a href="https://dashboard.nox46.com">
                <button
                  style="
                    border-radius: 1em !important;
                    min-width: 8.5rem !important;
                    width: 100% !important;
                    padding: 0em 0.25em !important;
                    border: 0 solid transparent;
                    background: linear-gradient(to left, #f25514, #ff8a3d);
                    color: white !important;
                    margin-top: 0.5rem;
                  "
                >
                  <h2
                    style="
                      color: white;
                      font-size: 16px !important;
                      font-weight: 400 !important;
                      font-family: system-ui;
                    "
                  >
                    Create event
                  </h2>
                </button></a
              >
            </div>
          </div>
        </div>
        <!-- <div
          style="width: 30%; flex: 0 1 30%; height: 50vh; position: relative"
        >
        </div> -->
      </div>
    </section>
  </body>`
    };
    // The user unsubscribed to the newsletter.
    try {
        await mailTransport.sendMail(mailOptions);
        functions.logger.log("Account confirmation email sent to:", user.email);
    }
    catch (e) {
        console.log("ERROR FUNC", e);
    }
});
/** Function to notify when user delete account */
const onDelete = functions.auth.user().onDelete(async (user) => {
    // console.log("DEST EMAIL", user.email);
    // const mailOptions = {
    //   from: "Nox46<noreply@firebase.com>",
    //   to: user.email,
    //   subject: "Account cancellation confirmation - Nox46",
    //   html:
    //   `<body
    //   style="
    //     width: calc(50vw - 2rem) !important;
    //     min-width: calc(50vw - 2rem) !important;
    //     box-sizing: border-box;
    //     overflow-x: hidden;
    //     margin: 0 auto;
    //   "
    // >
    //   <!-- Header -->
    //   <section
    //     style="
    //       width: calc(100% - 0rem);
    //       min-width: calc(100% - 0rem);
    //       box-sizing: border-box;
    //       margin-top: 1.5rem;
    //     "
    //   >
    //     <!-- <div class="triggerHeaderInmersive"></div> -->
    //     <div
    //       style="
    //         width: calc(100% - 2rem) !important;
    //         background-color: white;
    //         margin: 0 auto;
    //         border-radius: 1.5em !important;
    //         overflow: hidden;
    //         position: relative;
    //         padding-top: 1rem;
    //         padding-bottom: 1rem;
    //         padding-left: 0;
    //         padding-right: 0;
    //         box-sizing: border-box;
    //         box-shadow: 0px 0px 88px -14px rgba(0, 0, 0, 1) !important;
    //       "
    //     >
    //       <img
    //         fetchpriority="high"
    //         width="200"
    //         height="100"
    //         src="https://firebasestorage.googleapis.com/v0/b/eventbrite-e4885.appspot.com/o/main%2Fweb%2Fmain%2Ficon-384x384.png?alt=media&token=07cdbf30-0fa5-40cc-a5ba-2e0c5112bfad"
    //         style="
    //           width: 100%;
    //           height: 5vh;
    //           object-fit: contain;
    //           margin: 0 auto !important;
    //         "
    //       />
    //       <div style="width: 90%; margin: 0 auto">
    //         <p
    //           style="
    //             font-size: 18px !important;
    //             font-weight: 700 !important;
    //             color: #f25514 !important;
    //             text-align: center !important;
    //             margin-bottom: 1rem;
    //             font-family: system-ui;
    //           "
    //         >
    //           SEE YOU SOON!
    //         </p>
    //         <!-- <h2
    //           style="
    //             margin-top: 0.5em !important;
    //             margin-bottom: 1em !important;
    //             font-size: 24px !important;
    //             text-align: center;
    //             color: rgb(75, 75, 75);
    //             font-family: system-ui;
    //           "
    //         >
    //           ¡Plan and manage all your social events with Nox46!
    //         </h2> -->
    //         <div>
    //           <p
    //             style="
    //               width: 100%;
    //               font-size: 17px !important;
    //               font-family: system-ui;
    //               text-align: center !important;
    //             "
    //           >
    //             This email is to confirm that we have received your request to
    //             cancel your Nox46 account (${user.email}). We are very sorry to see you go and
    //             want to thank you for trusting us with your event needs.
    //           </p>
    //           <p
    //             style="
    //               width: 100%;
    //               font-size: 17px !important;
    //               text-align: center !important;
    //               font-family: system-ui;
    //             "
    //           >
    //             If you ever decide to return, we will be here to help you with
    //             everything you need. In the meantime, if there is anything else we
    //             can help you with during this cancellation process, please feel
    //             free to contact our support team.
    //           </p>
    //           <p
    //             style="
    //               width: 100%;
    //               font-size: 17px !important;
    //               text-align: center !important;
    //               font-family: system-ui;
    //             "
    //           >
    //             We wish you the best in your future endeavors and hope that your
    //             experience with Nox46 has been an overall positive one.
    //           </p>
    //           <!-- <div
    //             style="
    //               width: 100% !important;
    //               min-width: 100% !important;
    //               margin: 2.5rem auto 0 auto;
    //             "
    //           >
    //             <button
    //               (click)="goLogin()"
    //               style="
    //                 border-radius: 1em !important;
    //                 min-width: 8.5rem !important;
    //                 width: 100% !important;
    //                 padding: 0em 0.25em !important;
    //                 border: 0 solid transparent;
    //                 background: transparent;
    //                 border: 1px solid #f25514;
    //               "
    //             >
    //               <h2
    //                 style="
    //                   color: black;
    //                   font-size: 16px !important;
    //                   font-weight: 400 !important;
    //                   font-family: system-ui;
    //                 "
    //               >
    //                 Blog
    //               </h2>
    //             </button>
    //             <button
    //               (click)="goDashboard()"
    //               style="
    //                 border-radius: 1em !important;
    //                 min-width: 8.5rem !important;
    //                 width: 100% !important;
    //                 padding: 0em 0.25em !important;
    //                 border: 0 solid transparent;
    //                 background: linear-gradient(to left, #f25514, #ff8a3d);
    //                 color: white !important;
    //                 margin-top: 0.5rem;
    //               "
    //             >
    //               <h2
    //                 style="
    //                   color: white;
    //                   font-size: 16px !important;
    //                   font-weight: 400 !important;
    //                   font-family: system-ui;
    //                 "
    //               >
    //                 Create event
    //               </h2>
    //             </button>
    //           </div> -->
    //         </div>
    //       </div>
    //       <!-- <div
    //         style="width: 30%; flex: 0 1 30%; height: 50vh; position: relative"
    //       >
    //       </div> -->
    //     </div>
    //   </section>
    // </body>`
    // };
    // console.log("ONDELETE FUNC");
    // // The user unsubscribed to the newsletter.
    // try {
    //   await mailTransport.sendMail(mailOptions);
    //   functions.logger.log(
    //     "Account deletion confirmation email sent to:",
    //     user.email
    //   );
    // } catch (e) {
    //   console.log("ERROR FUNC", e);
    // }
    return null;
});
/** Function scheduled to call every 24 hours: to delete previous data based on actual time and the event plan selected */
// social = 15 days
// desire = 30 days
// lux = 60 days
// test = 2 minutes
// real = 24 hours
const onScheduler = functions.pubsub
    .schedule("every 72 hours")
    .onRun(async () => {
    // const querySnapshot = await getDocs(collection(db, "userPlatform"));
    try {
        let idList = [];
        const collectionRef = (0, lite_1.collection)(db, "userPlatform");
        const doxSnap = await (0, lite_1.getDocs)(collectionRef);
        doxSnap.forEach((doc) => {
            idList.push(doc.id);
        });
        if (idList.length > 0) {
            initCleaner(idList);
        }
    }
    catch (error) {
        console.log("ERROR: getAccounts", error);
    }
});
/** Function to init cleaner db
 * @param { acccounts } accounts Array for accounts
 */
async function initCleaner(accounts) {
    const substractFifteenDays = moment().subtract(15, "days").unix() * 1000;
    const substractThirtyDays = moment().subtract(30, "days").unix() * 1000;
    const substractSixtyDays = moment().subtract(60, "days").unix() * 1000;
    // const actualTime = moment().unix().valueOf();
    const actualTime = Date.now();
    try {
        for (const account of accounts) {
            const path = "userPlatform/" + account + "/events";
            const collectionRef = (0, lite_1.collection)(db, path);
            const doxSnap = await (0, lite_1.getDocs)(collectionRef);
            doxSnap.forEach((doc) => {
                const eDoc = doc.data();
                if (eDoc.eventDay != undefined) {
                    if (eDoc.eventDay.seconds != undefined) {
                        if (eDoc.eventDay.seconds < actualTime) {
                            if (eDoc.plan === "social") {
                                if (eDoc.eventDay.seconds < substractFifteenDays) {
                                    deleteStorage(account, eDoc.id, eDoc.name);
                                }
                            }
                            else if (eDoc.plan === "desire") {
                                if (eDoc.eventDay.seconds < substractThirtyDays) {
                                    deleteStorage(account, eDoc.id, eDoc.name);
                                }
                            }
                            else if (eDoc.plan === "lux") {
                                if (eDoc.eventDay.seconds < substractSixtyDays) {
                                    deleteStorage(account, eDoc.id, eDoc.name);
                                }
                            }
                            else if (eDoc.plan === "card") {
                                if (eDoc.eventDay.seconds < substractFifteenDays) {
                                    deleteStorage(account, eDoc.id, eDoc.title);
                                }
                            }
                        }
                    }
                }
            });
        }
    }
    catch (e) {
        console.log("Error iteration on accounts events", e);
    }
}
/** Delete storage on scheduler
 * @param { acccountID } accountID The User account ID
 * @param { eventID } eventID The event identifier
 * @param { name } name user name
 */
async function deleteStorage(accountID, eventID, name) {
    try {
        // const nBucket = bucketName + accountID + "/" + eventID
        const nBucket = bucketName; // + accountID
        // K2zBwKf Sunday, January 1, 2023 * desire -> DELETED
        // KtuWXTw Wednesday, March 1, 2023 * social -> DELETED
        // PeIYNQU Wednesday, March 1, 2023 * social -> NO DELETE
        // zHdqtaU Wednesday, March 1, 2023 * social -> NO DELETE
        // const bucket = admin.storage().bucket();
        // await bucket.deleteFiles({prefix: nBucket})
        await storage
            .bucket(nBucket)
            .deleteFiles({ prefix: accountID + "/" + eventID })
            .then(async (event) => {
            const path = "userPlatform/" + accountID + "/events/" + eventID;
            await (0, lite_1.deleteDoc)((0, lite_1.doc)(db, path))
                .then(async (e) => {
                const pathServ = "userPlatform/" + accountID;
                const servicesRef = (0, lite_1.doc)(db, pathServ);
                const model = {
                    name: name,
                    id: eventID,
                };
                await (0, lite_1.updateDoc)(servicesRef, {
                    services: (0, lite_1.arrayRemove)(model),
                }).then(() => {
                    console.log("SUCCESS_EVENTDELETE");
                });
            })
                .catch((error) => {
                console.log("ERROR_EVENTDELETE", error);
            });
        })
            .catch((e) => {
            console.log("ERROR BUCKET", e);
        });
    }
    catch (e) {
        console.log("Error_cleaning_storage", e);
    }
}
/* async function getAccounts(){
  itemsCollection.snapshotChanges().pipe(
    map(action => {
      return action.map(a => {
        const data = a.payload.doc.data() as ModelUserNox;
        const id = a.payload.doc.id;
        return {id, ...data}
      })
    })
  )
} */
/**
 * JobCloud Scheduler 1 hour
 * Used for admin actions and depending on some interval
 * */
const onSchedulerAlarms = functions.pubsub
    .schedule("every 36 hours")
    .onRun(async () => {
    console.log("every 5 minutes");
    /** Interval to Clean database */
    if (interval >= 36) {
        interval = 0;
    }
    else {
        interval++;
    }
    sendAdminAlarmCheck();
});
function sendAdminAlarmCheck() {
    // const querySnapshot = await getDocs(collection(db, "userPlatform"));
    try {
        // Send a message to devices subscribed to the provided topic.
        admin
            .messaging()
            .send(alarm)
            .then((response) => {
            // Response is a message ID string.
            console.log("Successfully sent admin-message:", response);
        })
            .catch((error) => {
            console.log("Error sending admin-message:", error);
        });
    }
    catch (error) {
        console.log("ERROR: getAccounts", error);
    }
}
const onSchedulerCurrency = functions.pubsub
    .schedule("every 52 hours")
    .onRun(async () => {
    console.log("onSchedulerCurrency");
    /** Interval to Clean database */ try {
        let path = "http://api.exchangeratesapi.io/v1/latest?access_key=0b944b44a771e12fb004a5098b82a600&symbols=USD,MXN,BRL,CLP,COP,BOB,ARS,PEN,CUP";
        request(path, (err, response, body) => {
            const o = JSON.parse(body);
            if (o.rates != undefined) {
                saveCurrency(o.rates);
            }
        });
    }
    catch (e) {
        /** CATCH */
    }
});
/** Save actual currency based On EURO */
async function saveCurrency(value) {
    try {
        const path = "prices/eventsInvites";
        const ref = (0, lite_1.doc)(db, path);
        await (0, lite_1.updateDoc)(ref, {
            rates: value,
        });
    }
    catch (err) {
        /** CATCH */
        console.log("ERROR", err);
    }
}
exports.onCreateHandler = onCreate;
exports.onDeleteHandler = onDelete;
exports.onSchedulerHandler = onScheduler;
exports.onSchedulerAlarmHandler = onSchedulerAlarms;
exports.onSchedulerCurrencyHandler = onSchedulerCurrency;
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started
// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
//# sourceMappingURL=index.js.map