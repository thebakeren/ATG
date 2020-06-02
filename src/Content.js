import React from 'react';
import ic_search from './icons/ic_search_24px.svg';


class Content extends React.Component {
    render(){
        return ( 
          <div>
          <ResultTableComponent/>
          </div>
          )   
    }

}


        class ResultTableComponent extends React.Component {
           constructor(){
                super()
                this.state={
                    results:[],
                    races:[],
                    user:"",
                    starts:[],
                    upcoming:[],
                    count:0,
                }
              
            }


            render(){
                 return ( 
           <div>
            <div id="seach">
             <form>
             <input className="user-input-text-field"  type="Text" onKeyUp={this.userInput} placeholder="Enter game type"/>
            </form> 
            <button className="user-input-button" type="Button">
             <img className="user-input-button" onClick={this.userSubmit} alt="GO" src={ ic_search }/></button>
            </div> 
                <div id="tab">
                <div id="game-info">   
                 <table id="races">
               <tbody><tr><th>Race number</th><th>Race name</th><th>Race start time</th></tr>
               { this.state.races.map((race,i)=> <TableRowRaces key={i} data={race}/>)}
               </tbody>
                </table>
                 <table id="starts">
                <tbody>
                <tr>
                <th>Start number</th><th>Horse name</th><th>Driver/Rider</th><th>Trainer</th><th>Horse father</th>
                </tr>{this.state.races.map((v,i)=> v.starts.map((v,i,a)=> <TableRowStarts key={i} data={v.driver} horse={v.horse} number={v.number}/>))}
                </tbody>
                </table>   
                </div>
                </div>
                 </div>

            )   
            }
         
    //get user input
   userInput=(event)=>{
        this.setState({user:event.target.value})
         }     
   
         userSubmit=(event)=>{
        if(this.state.user.length>1){
            let url="https://www.atg.se/services/racinginfo/v1/api/products/"+this.state.user.toLocaleUpperCase()
            
            let Promises= this.fetchResults(url);
            Promises.then((data)=>{
            let {results,upcoming}=data;
           
            if(![null,undefined,{}].includes(results) || ![null,undefined,{}].includes(upcoming)){
                if(![null,undefined,{}].includes(results)){
                    this.setState({results:results}) 
                }else if(![null,undefined,{}].includes(upcoming)){
                    this.setState({results:upcoming}) 
                }
                this.setState({races:[]}) 
                this.state.races.splice()
                this.setState({results:upcoming}) 
                 for(data of this.state.results){
                      if(![""," ",undefined].includes(data.id)){
            url='https://www.atg.se/services/racinginfo/v1/api/games/'+data.id
              Promises= this.fetchResults(url);
              Promises.then((data)=>{
                  let{races}=data;
               
                races.forEach((v,k,a)=>{
                     if(this.state.count>=a.length*a.length){
                        this.setState({count:this.state.count-this.state.count}) 
                  
                   }
                   this.setState({count:this.state.count+2}) 
                   this.state.races.push(v)
                })  
              })       
            }  
          }    
            }   
            
            })      
                
            }else{
                alert('Your input must be greater 3. Ex:V65')
            }
           
        } 

            //Fetch request
         fetchResults = async (url) => {
        let data= {}
          await fetch(url).then((response) => {
          
            if(response.status===404){
                alert("Search not found. Check your entries")
            }
             return response.json()
            
            }).then((response) => {
             data=response
             
            }).catch((e) => {
             
                console.log(e)
            })
            return data
        }
        }

      
    //Row data component for Race
        class TableRowRaces extends React.Component {


            render() {
                return (
                        <tr>
                        <td>{this.props.data.number}</td>
                        <td>{this.props.data.name}</td>
                       <td>{this.props.data.scheduledStartTime}</td>
                        </tr>  
                )
            }

        }
        
        //Row data component for start
        class TableRowStarts extends React.Component {


            render() {
                return (
                        <tr>
                       <td>{this.props.number}</td>
                       <td>{this.props.horse.name}</td>
                       <td>{this.props.data.firstName + ' '+ this.props.data.lastName}</td>
                       <td>{this.props.horse.trainer.firstName + ' '+ this.props.horse.trainer.lastName}</td>
                       <td>{this.props.horse.pedigree.father.name }</td>
                        </tr>  
                )
            }

        }

        export default Content