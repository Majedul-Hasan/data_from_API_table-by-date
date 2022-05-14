



async function getData() {
    const API = 'https://ktrax.kisstech.ch/backend/logbook?query_type=ap&id=LSPM&tz=2&dbeg=2022-01-01'
    //let url = 'users.json';
    try {
        let res = await fetch(API);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}


async function renderData() {
    let data = await getData();
    console.log(data);
    const {max_takeoffs, max_dalt, last_ldg, first_tkof, expiry_date, end_date, count, begin_date, query_type, query_canonicalized, num_takeoffs, max_takeoffs_reached, time_zone, t_end, t_begin, sum_dt, sum_dalt, subscription_category, subscribed, sorties} = data

    
    let date = sorties.map(item =>  item.date) 
      
    let uniqueDate = [...new Set(date)];
    
          console.log(uniqueDate);

     let html = '';


     uniqueDate.map(x=>{
          var htmlSegment = `<div><p class=' mt-4 mb-0 font-weight-bold '>  ${x}  </p> 
          <table class="table text-center table-bordered m-auto table-striped mt-4 w-100 block "  style="padding-bottom: 20px; margin-top: 20px;">
          <thead class=' text-center w-100 ' style='background-color: #74b1f5;'>
          <tr>
                    <th scope="col"><b>NR</b></th>
                    <th scope="col"><b>AIRCRAFT</b></th>
                    
                    <th scope="col"><b>TYPE</b></th>
                    <th scope="col" colspan="2"><b>TAKEOFF</b></th>
                    <th scope="col" colspan="2"><b>LANDING</b></th>
                    <th scope="col"><b>TIME</b></th>
                    <th scope="col"><b>AGL</b></th>
                    <th scope="col"><b><a href="/checkin/">CREW</a></b></th>
                    <th scope="col"><b>REMARK</b></th>
                    
                </tr>
            </thead>
            <tbody>
            
             `
        
          

        
              sorties.map((y, i)=>{
                  if(x === y.date){
                  htmlSegment +=     `<tr>
        <td>${i+1}</td>
        <td><a >${y?.cs}</a></td>
        
        <td>${y?.actype}</td> 
        <td>${y?.tkof?.time}</td>
        <td>${y?.tkof?.rwy}</td>
        <td>${y?.ldg?.time}</td>
        <td>${y?.ldg?.rwy}</td>
        <td>${y?.dt}</td>
        <td>${y?.seqnr}m</td>
        <td> <a>${y?.p1?.name}<a/><br/><a>${y?.p2?.name}<a/> </td>
        <td> <a>${y?.tkof?.loc}<a/> </td>
        </tr>
       
        `
                  }
                  
                  
                      
                 
                      
                  
              })
              htmlSegment += '</tbody> </table></div>'


               
          
          
          
         



          html += htmlSegment;

     })



 let container = document.querySelector('.container');
    container.innerHTML = html;
    
}
renderData();