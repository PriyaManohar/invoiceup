// var doc = new jsPDF();
//
//
//   function generatePdf(){
//
//   doc.setTextColor(100);
//   doc.setFont("helvetica");
//   doc.setFontSize(22);
//   doc.setFontType("bold");
//   doc.text('INVOICE',20,20);
//   doc.setLineWidth(0.5);
//   doc.line(20, 25, 200, 25);
//
//   setClinicianDetails(doc);
//   setProviderDetails(doc);
//   setPatientDetails(doc);
//   setTreatmentDetails(doc);
//
//
//   //doc.output('dataurlnewwindow');
//
//   //doc.save("inv.pdf");
//   var string = doc.output('datauristring');
//   var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>"
//   var x = window.open();
//   x.document.open();
//   x.document.write(iframe);
//   x.document.close();
//   //doc.output('dataurlnewwindow');
//
//   }
//
//   function setClinicianDetails(doc){
//
//
//     var f_name = sessionStorage.getItem("doc_firstname");
//     var l_name =  sessionStorage.getItem("doc_lastname");
//     var title = sessionStorage.getItem("doc_title");
//     var desg = sessionStorage.getItem("doc_designation");
//     var d_email = sessionStorage.getItem("doc_email");
//     var gmcno = sessionStorage.getItem("doc_gmcno");
//     var mobno = sessionStorage.getItem("doc_mobno");
//     var address1 = sessionStorage.getItem("doc_add1");
//     var address2 = sessionStorage.getItem("doc_add2");
//     var city = sessionStorage.getItem("doc_city");
//     var pcode = sessionStorage.getItem("doc_postcode");
//
//     console.log("retreiving session storage"+ pcode,mobno);
//
//     doc.setFontSize(12);
//     doc.setFontType("normal");
//     doc.text(title+" "+f_name+" "+l_name,140,35)
//     doc.text(desg,140,40)
//     doc.text(address1,140,50);
//     doc.text(address2,140,55);
//     doc.text(city,140,60);
//     doc.text(pcode,140,65);
//     doc.text(mobno,140,75);
//     doc.text(d_email,140,80);
//
//     }
//
//     function setProviderDetails(doc){
//
//       var prov_name = sessionStorage.getItem("prov_name");
//
//       var prov_add1 = sessionStorage.getItem("prov_add1");
//       var prov_add2 = sessionStorage.getItem("prov_add2");
//       var prov_town = sessionStorage.getItem("prov_town");
//       var prov_pcode = sessionStorage.getItem("prov_pcode");
//
//       doc.text("To:",20,85);
//       doc.text(prov_name,20,90);
//       doc.text(prov_add1,20,95);
//       doc.text(prov_add2,20,100);
//       doc.text(prov_town,20,105);
//       doc.text(prov_pcode,20,110);
//
//     }
//
//     function setPatientDetails(doc){
//
//       doc.rect(20, 120, 180, 40);
//       doc.line(20, 140, 200, 140);
//
//       var pat_fname = sessionStorage.getItem("pat_firstname");
//       var pat_lname = sessionStorage.getItem("pat_lastname");
//       var pat_title = sessionStorage.getItem("pat_title");
//       var policy_no = sessionStorage.getItem("policy_ref");
//       var dob = sessionStorage.getItem("pat_dob");
//
//       doc.text("Patient Name: "+pat_title+" "+pat_fname+" "+pat_lname,25,130);
//       doc.text("Patient Policy Number: "+policy_no,25,150);
//       doc.text("Patient Date of Birth: "+dob,100,150);
//
//     }
//
//     function setTreatmentDetails(doc){
//
//       doc.rect(20, 170, 180, 50);
//       doc.line(20, 185, 200, 185);
//       doc.setFontSize(14);
//       doc.text("Treatment Details",90,180);
//
//       var dob_proc = sessionStorage.getItem("dob_proc");
//       var proc_code = sessionStorage.getItem("proc_code");
//       var proc_fees = sessionStorage.getItem("proc_fees");
//
//       doc.setFontSize(12);
//       doc.text("Date of Treatment: "+dob_proc,25,195);
//       doc.text("Procedure Code: "+proc_code,25,205);
//       doc.text("Procedure Fees: "+proc_fees,25,215);
//
//
//     }
