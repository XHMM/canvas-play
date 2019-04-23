import ParticleElement from './lib'
import './index.scss'

console.log(11)
const ele = new ParticleElement({$element:document.querySelector('#a'),min: 20, max:50});

ele.on();
/*
setTimeout(()=>{
  console.log('off')
  ele.off();
},4000)*/
