export interface ExpensesItems {
    amount: number,
    bill_date: Date,
    bill_number: string,
    id:number,
    emp_id: string,
    emp_name: string,
    receipt: string,
    receiptContentType: string,
    rmcomments: string,
    rmstatus: string,
    rmstatustime: Date,
    supcomments: string,
    supstatus: string,
    supstatustime: Date,
    globalconf: Globalconf[],
    }

export interface Globalconf {
        default_value: number,
        expense_type:  string,
        id: number
      }