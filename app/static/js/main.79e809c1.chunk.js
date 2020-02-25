(this["webpackJsonpfailed-artifacts"]=this["webpackJsonpfailed-artifacts"]||[]).push([[0],{153:function(e,t,a){e.exports=a(293)},293:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(29),c=a.n(l),o=a(83),i=a.n(o),u=a(142),s=a(41),d=a(26),p=a(143),m=a(304),E=a(305),b=a(140),f=a(303),h=(a(159),a(130)),g=a.n(h).a.create({baseURL:"https://gitlab.com/api/v4//"}),j=a(84),D=a(55);function v(){var e=Object(j.a)(["\n  display: block;\n  padding: 2rem;\n  margin: 4rem;\n  border: 1rem solid #cccccc;\n  border-left-color: #777777;\n  border-radius: 50%;\n  width: 5rem;\n  height: 5rem;\n  animation: "," 1.2s linear infinite;\n"]);return v=function(){return e},e}function P(){var e=Object(j.a)(["\nfrom {\n    transform: rotate(0deg);\n  }\n\n  to {\n    transform: rotate(360deg);\n  }\n"]);return P=function(){return e},e}var y=Object(D.b)(P()),O=D.a.div(v(),y),I=function(){return r.a.createElement(O,null)},C=a(302),N=a(134),k=a.n(N),w=function(e){var t=e.retrievedData;return r.a.createElement(C.a,{collapsing:!0,color:"teal"},r.a.createElement(C.a.Header,null,r.a.createElement(C.a.Row,null,r.a.createElement(C.a.HeaderCell,null,"Name of test"),r.a.createElement(C.a.HeaderCell,null,"Number of Fails"))),r.a.createElement(C.a.Body,null,k.a.sortBy(t,["fail"]).reverse().map((function(e){return r.a.createElement(C.a.Row,{key:e.test},r.a.createElement(C.a.Cell,null,e.test),r.a.createElement(C.a.Cell,null,e.fail))}))))},R=a(300),_=a(294),T=function(e){var t=e.projectID,a=e.apiKey,n=e.selectedDate,l=e.handleChange,c=e.searchCall,o=e.startHour,i=e.endHour;return r.a.createElement(m.a,{inverted:!0,color:"teal"},r.a.createElement(E.a,{divided:"vertically"},r.a.createElement(E.a.Row,{columns:3},r.a.createElement(b.a,null,r.a.createElement(R.a,{icon:"gitlab",name:"projectID",value:t,onChange:l,placeholder:"Project ID",label:{basic:!0,content:"Project ID"},labelPosition:"left",type:"number"})),r.a.createElement(b.a,null,r.a.createElement(R.a,{icon:"key",name:"apiKey",type:"password",value:a,onChange:l,placeholder:"API key",label:{basic:!0,content:"API key"},labelPosition:"left"})),r.a.createElement(b.a,null,r.a.createElement(R.a,{icon:"clock",name:"selectedDate",value:n,onChange:l,placeholder:"Selected Day",label:{basic:!0,content:"Day to check"},labelPosition:"left",type:"date"}))),r.a.createElement(E.a.Row,{columns:"3"},r.a.createElement(b.a,null,r.a.createElement(_.a,{onClick:c,color:"black"},"Get results")),r.a.createElement(b.a,null,r.a.createElement(R.a,{icon:"clock",name:"startHour",value:o,onChange:l,placeholder:"From hour",label:{basic:!0,content:"From hour"},labelPosition:"left",type:"time"})),r.a.createElement(b.a,null,r.a.createElement(R.a,{icon:"clock",name:"endHour",value:i,onChange:l,placeholder:"Till hour",label:{basic:!0,content:"Till hour"},labelPosition:"left",type:"time"})))))},H={getResultsError:"There was an error while doing API request. Check if API key/Project ID is correct.",getTraceError:"Error retrieving trace from jobs",getPipelineError:"Error retrieving pipeline jobs data"};var A=function(){var e,t=new URLSearchParams(window.location.search),a=Object(n.useState)({displayedData:"",apiKey:Object({NODE_ENV:"production",PUBLIC_URL:"/get-failed-steps/app"}).REACT_APP_API_KEY,projectID:null===Object({NODE_ENV:"production",PUBLIC_URL:"/get-failed-steps/app"}).REACT_APP_PROJECT_ID?null===t.get("projectId")?"":t.get("projectId"):Object({NODE_ENV:"production",PUBLIC_URL:"/get-failed-steps/app"}).REACT_APP_PROJECT_ID,isError:!1,selectedDate:(new Date).toISOString().substring(0,10),isSearching:!1,pipelinesNumber:null,jobsNumber:null,testFailsNumber:null,dateOfCheck:null,startHour:"00:00",endHour:"23:59"}),l=Object(p.a)(a,2),c=l[0],o=l[1],h=function(e){var t=[],a=[];e.forEach((function(e){a.push(g.get("/projects/".concat(c.projectID,"/pipelines/").concat(e.id,"/jobs"),{headers:{"PRIVATE-TOKEN":c.apiKey}}).then((function(e){e.data.forEach((function(e){t.push(e.id)}))})).catch((function(e){console.log(H.getPipelineError)})))})),Promise.all(a).then((function(){j(t),o((function(e){return Object(d.a)({},e,{jobsNumber:t.length})}))}))},j=function(e){var t=[],a=[],n=/(?<=Failed Step: ).*?\n/g;e.forEach((function(e){a.push(g.get("/projects/".concat(c.projectID,"/jobs/").concat(e,"/trace"),{headers:{"PRIVATE-TOKEN":c.apiKey}}).then((function(e){var a;return i.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:if(null===(a=e.data.match(n))){r.next=4;break}return r.next=4,i.a.awrap(t.push.apply(t,Object(u.a)(a)));case 4:case"end":return r.stop()}}))})).catch((function(e){console.log(H.getTraceError)})))})),Promise.all(a).then((function(){o((function(e){return Object(d.a)({},e,{isError:!1,isSearching:!1,displayedData:t,testFailsNumber:t.length})}))}))};return r.a.createElement(m.a,null,r.a.createElement(T,{projectID:c.projectID,apiKey:c.apiKey,selectedDate:c.selectedDate,handleChange:function(e){var t=e.target,a=t.name,n=t.value;o("selectedDate"===a?function(e){return Object(d.a)({},e,Object(s.a)({},a,n.substring(0,10)))}:function(e){return Object(d.a)({},e,Object(s.a)({},a,n))})},searchCall:function(e){o((function(e){return Object(d.a)({},e,{isSearching:!0,isError:!1,pipelinesNumber:null,jobsNumber:null,testFailsNumber:null,dateOfCheck:c.selectedDate})}));var t=new Date(c.selectedDate);return t.setDate(t.getDate()+1),g.get("/projects/".concat(c.projectID,"/pipelines?updated_after=").concat(c.selectedDate,"T").concat(c.startHour,":00Z&order_by=updated_at&sort=asc&updated_before=").concat(t,"T").concat(c.endHour,":00Z"),{headers:{"PRIVATE-TOKEN":c.apiKey}}).then((function(e){h(e.data),o((function(t){return Object(d.a)({},t,{pipelinesNumber:e.data.length})}))})).catch((function(e){o((function(e){return Object(d.a)({},e,{isError:!0,isSearching:!1})}))}))},startHour:c.startHour,endHour:c.endHour}),r.a.createElement(E.a,{columns:"equal"},r.a.createElement(b.a,{width:"8"},!c.isError&&!c.isSearching&&0!==c.displayedData.length&&r.a.createElement(w,{retrievedData:(e=c.displayedData,e.filter((function(e,t,a){return a.indexOf(e)===t})).map((function(t){return{test:t,fail:e.filter((function(e){return e===t})).length}})))}),c.isError&&r.a.createElement(f.a,{negative:!0},r.a.createElement(f.a.Header,{"data-testid":"messageBox"},H.getResultsError)),c.isSearching&&r.a.createElement(I,null)),r.a.createElement(b.a,{width:"4"},!c.isError&&null!==c.pipelinesNumber&&r.a.createElement(f.a,null,r.a.createElement("p",null,"Check for date: ",c.dateOfCheck," "),r.a.createElement("p",null,"Pipelines retrieved: ",c.pipelinesNumber," "),null!==c.jobsNumber&&r.a.createElement("p",null," Jobs retrieved: ",c.jobsNumber," "),null!==c.testFailsNumber&&r.a.createElement("p",null," Failed steps: ",c.testFailsNumber," ")))))};c.a.render(r.a.createElement(A,null),document.getElementById("root"))}},[[153,1,2]]]);
//# sourceMappingURL=main.79e809c1.chunk.js.map