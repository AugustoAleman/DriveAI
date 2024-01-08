export interface LoadingStates {
    validate: boolean,
    reject: boolean,
    documents: boolean
}

export interface DemoSaleDocument {
    documentId:         number;
    documentRequiredId: DocumentRequiredID;
    externalId:         number;
    externalTable:      string;
    storageUrl:         string;
    status:             string;
    ocrChecked:         boolean;
    createdAt:          Date;
    updatedAt:          Date | null;
    deletedAt:          Date | null;
    deleted:            boolean;
}

export interface DocumentRequiredID {
    documentRequiredId: number;
    externalId:         number;
    externalTable:      string;
    documentName:       string;
    documentNote:       string;
    documentFormat:     string;
    processType:        string;
    createdAt:          Date;
    updatedAt:          Date;
    isDeleted:          boolean;
    deletedAt:          Date;
    deleted:            boolean;
}

export interface RequestDocumentProps {
    operationType: string;
    userId: number;
}

export interface RequestDocumentsComponentsBoxProps {
    tertiary: {
        main: string
    }
}

export interface RequestDocumentDocContainerProps {
    verified: string,
    status: {
        correct: string,
        wrong: string,
    },
    key: string,
    onClick?: () => void
}

export interface ModalBoxProps {
    tertiary: {
        main: string
    }
}