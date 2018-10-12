import React, {Component} from 'react';
import tools from './tools/tools';
import './style/App.css';


const prizeConfig = [
    '笔记本','稀有造型','火箭','点卡？','天使甲',
    '绝版造型','神操作','点卡','加油','鼠标','灰机',
    '点卡','谢谢惠顾','好棒棒','键盘','小金人','点卡','徽章'
];

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            index: 0,
            running: false,
        };
        this.timerDzp = null; // 大转盘timer
    }
    componentWillUnmount(){
        if(this.timerDzp){clearTimeout(this.timerDzp)}
    }
    handleProxyStart(){
        const {running} = this.state;
        if(!running){
            this.setState({running:!running}, this.start);
        }
    }
    start(){
        // 取随机数0~17  +  5~10圈  -- 获得本次要走的步数
        let {index} = this.state;
        const addStep = tools.randomNum(0,17) + tools.randomNum(5,10)*18 + index;
        // 开启定时器
        const _this = this;
        function addOneStep(){
            index += 1;
            if(index <= addStep){
                _this.setState({index});
                const speed = parseInt((addStep - index)/18);
                let milliseconds = 1000/30;
                if(speed === 3){
                    milliseconds = 1000/15;
                }
                if(speed === 2){
                    milliseconds = 1000/8;
                }
                if(speed <= 1){
                    milliseconds = 1000/4;
                }
                _this.timerDzp = setTimeout(addOneStep, milliseconds);
            }else{
                _this.setState({running: false});
            }
        }
        addOneStep();
    }
    renderPrizeDoms(){
        const prizeDoms = [];
        const {index} = this.state;
        for(let i=0;i<=17;i++){
            if(index%18 === i){
                prizeDoms.push(<div key={'prize'+i} style={{background:'red',color:'#fff'}}>{prizeConfig[i]}</div>);
            }else{
                prizeDoms.push(<div key={'prize'+i}>{prizeConfig[i]}</div>);
            }
        }
        return prizeDoms;
    }
    render() {
        return (
            <div className="App">
                <div className="bg-wrapper">
                    <section className="action-wrapper" onClick={this.handleProxyStart.bind(this)}>
                        转起来
                    </section>
                    <section className="prize-wrapper">
                        {this.renderPrizeDoms()}
                    </section>
                </div>
            </div>
        );
    }
};

export default App;
