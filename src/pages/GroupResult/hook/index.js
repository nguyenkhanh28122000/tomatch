const getCompatibilityCalculation = (key, arr) => {
    let arr2 = [];
    if (!!arr) {
        switch (key) {
            case 1:
                for (let value of arr) {
                    switch (value.QuestionType) {
                        case 1:
                            arr2.push({
                                job: 'được',
                                character: 'tốt',
                            });
                            break;
                        case 2:
                            arr2.push({
                                job: 'được',
                                character: 'kém',
                            });
                            break;
                        case 3:
                            arr2.push({
                                job: 'được',
                                character: 'tốt',
                            });
                            break;
                        case 4:
                            arr2.push({
                                job: 'tuyệt vời',
                                character: 'được',
                            });
                            break;
                    }
                }
                break;
            case 2:
                for (let value of arr) {
                    switch (value.QuestionType) {
                        case 1:
                            arr2.push({
                                job: 'được',
                                character: 'kém',
                            });
                            break;
                        case 2:
                            arr2.push({
                                job: 'tốt',
                                character: 'tuyệt vời',
                            });
                            break;
                        case 3:
                            arr2.push({
                                job: 'tốt',
                                character: 'kém',
                            });
                            break;
                        case 4:
                            arr2.push({
                                job: 'tuyệt vời',
                                character: 'tuyệt vời',
                            });
                            break;
                    }
                }
                break;
            case 3:
                for (let value of arr) {
                    switch (value.QuestionType) {
                        case 1:
                            arr2.push({
                                job: 'được',
                                character: 'tốt',
                            });
                            break;
                        case 2:
                            arr2.push({
                                job: 'tốt',
                                character: 'kém',
                            });
                            break;
                        case 3:
                            arr2.push({
                                job: 'kém',
                                character: 'tuyệt vời',
                            });
                            break;
                        case 4:
                            arr2.push({
                                job: 'tuyệt vời',
                                character: 'được',
                            });
                            break;
                    }
                }
                break;
            case 4:
                for (let value of arr) {
                    switch (value.QuestionType) {
                        case 1:
                            arr2.push({
                                job: 'tuyệt vời',
                                character: 'được',
                            });
                            break;
                        case 2:
                            arr2.push({
                                job: 'tuyệt vời',
                                character: 'tuyệt vời',
                            });
                            break;
                        case 3:
                            arr2.push({
                                job: 'tuyệt vời',
                                character: 'được',
                            });
                            break;
                        case 4:
                            arr2.push({
                                job: 'tốt',
                                character: 'tuyệt vời',
                            });
                            break;
                    }
                }
                break;
        }
    }

    return arr2;
};

export { getCompatibilityCalculation };
