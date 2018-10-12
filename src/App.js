import React, {Component} from 'react';
import tools from './tools/tools';
import './style/App.css';
import prizeConfig from './config/index';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            running: false,
        };
        this.timerDzp = null; // 大转盘timer
    }

    componentWillUnmount() {
        if (this.timerDzp) {
            clearTimeout(this.timerDzp)
        }
    }

    // 决定是否要开始转盘
    handleProxyStart() {
        const {index, running} = this.state;
        if (!running) {
            const addStep = this.proxyAddStep();
            this.setState({running: !running}, this.start.bind(this, addStep));
        }
    }

    // 控制中奖概率
    proxyAddStep() {
        const {index} = this.state;
        const arr = [];
        prizeConfig.forEach(item => {
            if (item.probVal > 0) {
                for (let i = 0; i < item.probVal; i++) {
                    arr.push(item.pIndex);
                }
            }
        });
        const randomVal = tools.randomArr(arr) + (18 - index % 18);
        const addStep = randomVal + tools.randomNum(5, 10) * 18 + index;
        return addStep;
    }

    start(addStep) {
        // 取随机数0~17  +  5~10圈  -- 获得本次要走的步数
        let {index} = this.state;
        // 开启定时器
        const _this = this;

        function addOneStep() {
            index += 1;
            if (index <= addStep) {
                _this.setState({index});
                const speed = parseInt((addStep - index) / 18);
                let milliseconds = 1000 / 30;
                if (speed === 3) {
                    milliseconds = 1000 / 15;
                }
                if (speed === 2) {
                    milliseconds = 1000 / 8;
                }
                if (speed <= 1) {
                    milliseconds = 1000 / 4;
                }
                _this.timerDzp = setTimeout(addOneStep, milliseconds);
            } else {
                _this.setState({running: false});
            }
        }

        addOneStep();
    }

    renderPrizeDoms() {
        const prizeDoms = [];
        const {index} = this.state;
        for (let i = 0; i <= 17; i++) {
            if (index % 18 === i) {
                prizeDoms.push(<div key={'prize' + i}
                                    style={{background: 'red', color: '#fff'}}>{prizeConfig[i].prizeName}</div>);
            } else {
                prizeDoms.push(<div key={'prize' + i}>{prizeConfig[i].prizeName}</div>);
            }
        }
        return prizeDoms;
    }

    render() {
        const prizeConfigStr = JSON.stringify(prizeConfig);
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
                <div style={{textAlign:'center'}}>
                    <p>中奖概率，请在  src/config/index.js  里面设置</p>
                    <p>probVal 代表中奖的概率，例如，按照如下设置：</p>
                    <p>加油、谢谢惠顾  的中奖概率为：100/216</p>
                    <p>其他的中奖概率都为：1/216</p>
                    <p>{prizeConfigStr}</p>
                </div>
            </div>
        );
    }
};

export default App;
