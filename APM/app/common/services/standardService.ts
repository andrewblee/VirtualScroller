module app.common {
    export interface IStandardsById {
        [id: number]: IStandard
    }

    export interface IStandard {
        id: number,
        name: string
    }

    interface IStandardService {
        getStandardsById(): IStandardsById;
        getStandardIds(): number[];
        getStandards(): IStandard[];
    }

    export class StandardService implements IStandardService {

        static $inject = [];
        constructor() {

        }

        getStandards(): IStandard[] {
            return [
                {
                    'id': 1,
                    'name': '1'
                },
                {
                    'id': 2,
                    'name': '2'
                },
                {
                    'id': 3,
                    'name': '3'
                },
                {
                    'id': 4,
                    'name': '4'
                },
                {
                    'id': 5,
                    'name': '5'
                },
                {
                    'id': 6,
                    'name': '6'
                },
                {
                    'id': 7,
                    'name': '7'
                },
                {
                    'id': 8,
                    'name': '8'
                },
                {
                    'id': 9,
                    'name': '9'
                },
                {
                    'id': 10,
                    'name': '10'
                },
                {
                    'id': 11,
                    'name': '11'
                },
                {
                    'id': 12,
                    'name': '12'
                },
                {
                    'id': 13,
                    'name': '13'
                },
                {
                    'id': 14,
                    'name': '14'
                },
                {
                    'id': 15,
                    'name': '15'
                },
                {
                    'id': 16,
                    'name': '16'
                },
                {
                    'id': 17,
                    'name': '17'
                },
                {
                    'id': 18,
                    'name': '18'
                },
                {
                    'id': 19,
                    'name': '19'
                },
                {
                    'id': 20,
                    'name': '20'
                },
                {
                    'id': 21,
                    'name': '21'
                },
                {
                    'id': 22,
                    'name': '22'
                },
                {
                    'id': 23,
                    'name': '23'
                },
                {
                    'id': 24,
                    'name': '24'
                },
                {
                    'id': 25,
                    'name': '25'
                },
                {
                    'id': 26,
                    'name': '26'
                },
                {
                    'id': 27,
                    'name': '27'
                }
            ];
        }

        getStandardIds(): number[] {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
        }

        getStandardsById(): IStandardsById {
            return {
                '1': {
                    'id': 1,
                    'name': '1'
                },
                '2': {
                    'id': 2,
                    'name': '2'
                },
                '3': {
                    'id': 3,
                    'name': '3'
                },
                '4': {
                    'id': 4,
                    'name': '4'
                },
                '5': {
                    'id': 5,
                    'name': '5'
                },
                '6': {
                    'id': 6,
                    'name': '6'
                },
                '7': {
                    'id': 7,
                    'name': '7'
                },
                '8': {
                    'id': 8,
                    'name': '8'
                },
                '9': {
                    'id': 9,
                    'name': '9'
                },
                '10': {
                    'id': 10,
                    'name': '10'
                },
                '11': {
                    'id': 11,
                    'name': '11'
                },
                '12': {
                    'id': 12,
                    'name': '12'
                },
                '13': {
                    'id': 13,
                    'name': '13'
                },
                '14': {
                    'id': 14,
                    'name': '14'
                },
                '15': {
                    'id': 15,
                    'name': '15'
                },
                '16': {
                    'id': 16,
                    'name': '16'
                },
                '17': {
                    'id': 17,
                    'name': '17'
                },
                '18': {
                    'id': 18,
                    'name': '18'
                },
                '19': {
                    'id': 19,
                    'name': '19'
                },
                '20': {
                    'id': 20,
                    'name': '20'
                },
                '21': {
                    'id': 21,
                    'name': '21'
                },
                '22': {
                    'id': 22,
                    'name': '22'
                },
                '23': {
                    'id': 23,
                    'name': '23'
                },
                '24': {
                    'id': 24,
                    'name': '24'
                },
                '25': {
                    'id': 25,
                    'name': '25'
                },
                '26': {
                    'id': 26,
                    'name': '26'
                },
                '27': {
                    'id': 27,
                    'name': '27'
                }
            };
        }
    }
    angular.module("common.services").service("standardService", StandardService);
}