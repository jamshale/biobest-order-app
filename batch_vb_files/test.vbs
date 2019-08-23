'
'
'
Set objExcel = CreateObject("Excel.Application")
'workbooks
Set orderForm = objExcel.Workbooks.Open("C:\Users\Admin\Documents\Biobest Order App\Biobest Order Form.xls")
Set customers = objExcel.Workbooks.Open("C:\Program Files\MongoDB\Server\3.4\bin\customers.csv")
Set orders = objExcel.Workbooks.Open("C:\Program Files\MongoDB\Server\3.4\bin\orders.csv")

'writer
Set objFSO = CreateObject("Scripting.FileSystemObject")
outFile="C:\Users\Admin\Documents\Biobest Order App\test_output.txt"
Set objFile = objFSO.CreateTextFile(outFile,True)

'sheets
Set currentCustomerSheet = customers.Sheets("customers")
Set currentOrderSheet = orders.Sheets("orders")
'multiple orders for customer check array
Dim individualCustomerCount : Set individualCustomerCount = CreateObject("System.Collections.ArrayList")

'customer sheet traverse
Dim i : i = 2
Do While currentOrderSheet.cells(i, 1).Value <> ""
	Dim currentCustomerId : currentCustomerId = currentOrderSheet.cells(i, 2).Value
	'multiple orders for customer check 
	individualCustomerCount.add currentCustomerId
	Dim numberCustomerOrder : numberCustomerOrder = 0
	Dim o
	For Each o In individualCustomerCount
		If o = currentCustomerId Then
			numberCustomerOrder = numberCustomerOrder + 1
		End If
	Next
	'find customer
	Dim j : j = 2
	Do While currentCustomerSheet.cells(j, 1).Value <> ""
		If currentCustomerSheet.cells(j, 1).Value = currentCustomerId Then
			'clone and save order form template
			Dim saveStr : saveStr = "C:\Users\Admin\Documents\Biobest Order App\order_forms\" & currentCustomerSheet.cells(j, 3).Value & " - (" & numberCustomerOrder & ").xls"
			'
			Set localOrderForm = orderForm.Sheets("Biobest Order Form model 1")
			'populate customer information
			Dim orderInvLocation : orderInvLocation = currentOrderSheet.cells(i, 3).Value
			Dim orderShipLocation : orderShipLocation = currentOrderSheet.cells(i, 4).Value
				'convert invLocation
				orderInvLocation = Replace(orderInvLocation,"company", "")
				orderInvLocation = Replace(orderInvLocation,"contact", "")
				orderInvLocation = Replace(orderInvLocation,"address", "")
				orderInvLocation = Replace(orderInvLocation,"cityState", "")
				orderInvLocation = Replace(orderInvLocation,"zip", "")
				orderInvLocation = Replace(orderInvLocation,"phone", "")
				orderInvLocation = Replace(orderInvLocation,"fax", "")
				orderInvLocation = Replace(orderInvLocation,"email", "")
				orderInvLocation = Replace(orderInvLocation,"[", "")
				orderInvLocation = Replace(orderInvLocation,"]", "")
				orderInvLocation = Replace(orderInvLocation,"{", "")
				orderInvLocation = Replace(orderInvLocation,"}", "")
				orderInvLocation = Replace(orderInvLocation,chr(34), "")
				orderInvLocation = Replace(orderInvLocation,":", " ")
				orderInvLocation = Replace(orderInvLocation,",", "|")
				orderInvLocation = Replace(orderInvLocation,"~", ",")
				'convert shipLocation
				orderShipLocation = Replace(orderShipLocation,"company", "")
				orderShipLocation = Replace(orderShipLocation,"contact", "")
				orderShipLocation = Replace(orderShipLocation,"address", "")
				orderShipLocation = Replace(orderShipLocation,"cityState", "")
				orderShipLocation = Replace(orderShipLocation,"zip", "")
				orderShipLocation = Replace(orderShipLocation,"phone", "")
				orderShipLocation = Replace(orderShipLocation,"fax", "")
				orderShipLocation = Replace(orderShipLocation,"email", "")
				orderShipLocation = Replace(orderShipLocation,"[", "")
				orderShipLocation = Replace(orderShipLocation,"]", "")
				orderShipLocation = Replace(orderShipLocation,"{", "")
				orderShipLocation = Replace(orderShipLocation,"}", "")
				orderShipLocation = Replace(orderShipLocation,chr(34), "")
				orderShipLocation = Replace(orderShipLocation,":", " ")
				orderShipLocation = Replace(orderShipLocation,",", "|")
				orderShipLocation = Replace(orderShipLocation,"~", ",")
			
			Dim orderInvLocationSplit : orderInvLocationSplit = Split(orderInvLocation, "|")
			Dim orderShipLocationSplit : orderShipLocationSplit = Split(orderShipLocation, "|")
			
			localOrderForm.cells(9,2).Value = orderInvLocationSplit(0)
			localOrderForm.cells(10,2).Value = orderInvLocationSplit(1)
			localOrderForm.cells(11,2).Value = orderInvLocationSplit(2)
			localOrderForm.cells(12,2).Value = orderInvLocationSplit(3)
			localOrderForm.cells(13,2).Value = orderInvLocationSplit(4)
			localOrderForm.cells(14,2).Value = orderInvLocationSplit(5)
			localOrderForm.cells(15,2).Value = orderInvLocationSplit(6)
			localOrderForm.cells(16,2).Value = orderInvLocationSplit(7)
			
			localOrderForm.cells(9,5).Value = orderShipLocationSplit(0)
			localOrderForm.cells(10,5).Value = orderShipLocationSplit(1)
			localOrderForm.cells(11,5).Value = orderShipLocationSplit(2)
			localOrderForm.cells(12,5).Value = orderShipLocationSplit(3)
			localOrderForm.cells(13,5).Value = orderShipLocationSplit(4)
			localOrderForm.cells(14,5).Value = orderShipLocationSplit(5)
			localOrderForm.cells(15,5).Value = orderShipLocationSplit(6)
			localOrderForm.cells(16,5).Value = orderShipLocationSplit(7)

			'order format
			Dim orderProductList : orderProductList = currentOrderSheet.cells(i, 5).Value
			orderProductList = Replace(orderProductList,"[", "")
			orderProductList = Replace(orderProductList,"]", "")
			orderProductList = Replace(orderProductList,"{", "")
			orderProductList = Replace(orderProductList,"}", "")
			orderProductList = Replace(orderProductList,chr(34), "")
			orderProductList = Replace(orderProductList,":", " ")
			orderProductList = Replace(orderProductList,",", " ")
			Dim orderProductListSplit : orderProductListSplit = Split(orderProductList)
			'order scan
			Dim k : k = 0
			Dim l : l = UBound(orderProductListSplit)
			Do While k < l
				Dim localOrderProductId : localOrderProductId = orderProductListSplit(k + 1)
				localOrderProductId = CLng(localOrderProductId)
				Dim m : m = 25
				'product scan
				Do While localOrderForm.cells(m,1).Value <> ""
					Dim tempCode : tempCode = CLng(localOrderForm.cells(m,1).Value)
					If tempCode = localOrderProductId Then
						localOrderForm.cells(m,7) = orderProductListSplit(k + 3)
						Exit Do
					End If
					'order form scan blank check
					If m + 1 = 34 Or m + 1 = 41 Or m + 1 = 69 Or m + 1 = 84 Or m + 1 = 100 Or m + 1 = 122 Or m + 1 = 125 Or m + 1 = 127 Or m + 1 = 130 Or m + 1 = 138 Or m + 1 = 143 Or m + 1 = 157 Or m + 1 = 165 Or m + 1 = 170 Or m + 1 = 177 Or m + 1 = 184 Or m + 1 = 187 Or m + 1 = 194 Or m + 1 = 199 Or m + 1 = 207 Or m + 1 = 261 Or m + 1 = 283 Then
						m = m + 1
						If m + 1 = 158 Then
							m = m + 1
						End If
					End If
					m = m + 1
				Loop
			k = k + 4
			Loop	
			orderForm.SaveAs(saveStr)
			Set orderForm = objExcel.Workbooks.Open("C:\Users\Admin\Documents\Biobest Order App\Biobest Order Form.xls")
			Set localOrderForm = orderForm.Sheets("Biobest Order Form model 1")
		Exit Do
		End If
		j = j + 1
	Loop
	i = i + 1
Loop

objFile.Close

'objExcel.Application.Visible = True

objExcel.Application.Quit
WScript.Quit
Set objExcel = Nothing


