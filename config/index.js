// const urlone ='https://github.com/yangzicheng/command-line'
// const urltwo ='https://github.com/moewang0321/moe-cli'
// const urlthree ='https://github.com/fe6/fecli'
// 注意 github上面的项目只需要 用户名/仓库名
const urlone ='yangzicheng/command-line'
const urltwo ='moewang0321/moe-cli'
const urlthree ='fe6/fecli'
const promotes = [
    {
        type:'list',
        message:'please choose project type',
        name:'proType',
        choices:[
            {
                name:'CommandLine',
                value:'commandLine',
                short:'CommandLine'
            },
            {
                name:'MoeCli',
                value:'moeCli',
                short:'MoeCli'
            },
        ]
    },
    {
        type:'list',
        message:'please choose CommandLine template',
        name:'tpl',
        // when据前面问题的回答，判断当前问题是否需要被回答；// 当proType为commandLine的时候才会提问当前问题
        when(answer){
            return answer.proType === "commandLine"; 
        },
        choices:[
            {
                name:'CommandLinePro',
                value:urlone,
                short: "CommandLine Template",
            }
        ]
    },
    {
        type:'list',
        message:'please choose MoeCli template',
        name:'tpl',
        when(answer){
            return answer.proType === "moeCli"; 
        },
        choices:[
            {
                name:'moeCliPro',
                value:urltwo,
                short: "moeCli Template",
            },
            {
                name:'fecliPro',
                value:urlthree,
                short: "fecliPro Template",
            }
        ]
    }
]

module.exports.promotes = promotes;
