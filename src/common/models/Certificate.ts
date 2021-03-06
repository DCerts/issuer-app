interface Certificate {
    regNo: string;
    group?: number;
    onChainId?: number;
    batchRegNo?: string;
    conferredOn: string;
    dateOfBirth?: string;
    yearOfGraduation?: string;
    majorIn?: string;
    degreeOf?: string;
    degreeClassification?: string;
    modeOfStudy?: string;
    createdIn?: string;
    createdAt?: number;
    issued?: boolean;
}

export default Certificate;