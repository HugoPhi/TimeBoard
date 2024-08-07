import inquirer from 'inquirer';

async function main() {
    while (true) {
        try {
            console.clear();
            const mainTaskAnswer = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'mainTask',
                    message: '请选择要进行的任务：',
                    choices: ['清理Google Keep', '清理未来计划']
                }
            ]);

            if (mainTaskAnswer.mainTask === '清理未来计划') {
                const futurePlanAnswer = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'futurePlan',
                        message: '将这个计划转化为近期可执行的任务/暂不处理/加入到垃圾箱？',
                        choices: ['转化为近期可执行的任务', '暂不处理', '加入到垃圾箱']
                    }
                ]);

                if (futurePlanAnswer.futurePlan === '转化为近期可执行的任务') {
                    await handleExecutableTask();
                } else if (futurePlanAnswer.futurePlan === '暂不处理') {
                    console.log('请将该计划重新加入到未来计划To-do List。');
                } else {
                    console.log('请将该计划加入到垃圾箱。');
                }
            } else {
                const googleKeepAnswer = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'googleKeep',
                        message: '这是一个近期可执行的任务吗？',
                        choices: ['是的', '不是']
                    }
                ]);

                if (googleKeepAnswer.googleKeep === '不是') {
                    const taskTypeAnswer = await inquirer.prompt([
                        {
                            type: 'list',
                            name: 'taskType',
                            message: '请问这是参考文献/未来计划/垃圾信息？',
                            choices: ['参考文献', '未来计划', '垃圾信息']
                        }
                    ]);

                    if (taskTypeAnswer.taskType === '参考文献') {
                        await handleExecutableTask();
                    } else if (taskTypeAnswer.taskType === '未来计划') {
                        console.log('请将该计划加入到未来计划To-do List。');
                    } else {
                        console.log('请将该计划加入到垃圾箱。');
                    }
                } else {
                    await handleExecutableTask();
                }
            }

            const { repeat } = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'repeat',
                    message: '你想再次运行GTD脚本吗？',
                    default: true  // 设置默认选项为“确定”
                }
            ]);

            if (!repeat) {
                break;
            }

        } catch (error) {
            console.error('程序运行出错:', error);
            break;
        }
    }
}

async function handleExecutableTask() {
    const taskStepAnswer = await inquirer.prompt([
        {
            type: 'list',
            name: 'taskStep',
            message: '请仔细思考这个任务的具体步骤，这个任务能一步做完吗？',
            choices: ['一步能做完', '多步才能做完']
        }
    ]);

    if (taskStepAnswer.taskStep === '一步能做完') {
        const immediateAnswer = await inquirer.prompt([
            {
                type: 'list',
                name: 'immediate',
                message: '马上能做完吗？',
                choices: ['可以', '不行']
            }
        ]);

        if (immediateAnswer.immediate === '可以') {
            console.log('开干！');
        } else {
            const delegateAnswer = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'delegate',
                    message: '这个任务可以推给别人做吗？',
                    choices: ['可以', '不可以']
                }
            ]);

            if (delegateAnswer.delegate === '可以') {
                console.log('请你记得跟进进度。请参考以下建议：\n' +
                    '➀ 向对方确定大致时间\n' +
                    '➁ 设置提醒，小事情（一天以内）提前10%，大事情（超过一天）跟ddl一样，并了解质量。');
            } else {
                console.log('请你根据任务的截止日期，添加日历并同步到To-do List。请参考以下建议：\n' +
                    '- 如何安排日期：\n' +
                    '  ➀ 向下估计任务的ddl\n' +
                    '  ➁ 加入到Google日历\n' +
                    '  ➂ 按提前90%，70%，50%，30%，最小单位，设置提醒：xxx天后某个任务ddl。如果任务比较小也可以减少提醒次数为一次，提前到最小单位。\n' +
                    '- 如何添加To-do List：\n' +
                    '  ➀ 根据所属的多步任务加入到Todolist\n' +
                    '  ➁ 如果是单步，则加入到日常To-do List\n' +
                    '  ➂ 根据紧急程度设置优先级，跟ddl提醒同步');
            }
        }
    } else {
        console.log('分割任务。请参考以下建议：\n' +
            '➀ 确定所有的子任务，上估计开始时间，上估计持续时间。\n' +
            '➁ 在markdown中画甘特图。');
        console.log('请你根据任务的截止日期，添加日历并同步到To-do List。请参考以下建议：\n' +
            '- 如何安排日期：\n' +
            '  ➀ 向下估计任务的ddl\n' +
            '  ➁ 加入到Google日历\n' +
            '  ➂ 按提前90%，70%，50%，30%，最小单位，设置提醒：xxx天后某个任务ddl。如果任务比较小也可以减少提醒次数为一次，提前到最小单位。\n' +
            '- 如何添加To-do List：\n' +
            '  ➀ 根据所属的多步任务加入到Todolist\n' +
            '  ➁ 如果是单步，则加入到日常To-do List\n' +
            '  ➂ 根据紧急程度设置优先级，跟ddl提醒同步');
    }
}

main().catch(console.error);

