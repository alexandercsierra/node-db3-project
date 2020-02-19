-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
SELECT p.productname
    , c.categoryname
FROM product as p
JOIN category as c ON p.categoryid = c.id

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
SELECT orderdate
    ,shipper.companyname
FROM [Order]
JOIN shipper ON [order].shipvia = shipper.id
WHERE orderdate < '2012-08-09';

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
SELECT od.orderid
    ,prod.productname
    ,od.quantity
FROM orderdetail as od
JOIN product as prod ON od.productid = prod.id 
WHERE orderid=10251
ORDER BY prod.productname;



-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
SELECT o.id as OrderID
    ,cust.companyname as Company
    ,emp.firstname as Employee_First_Name
    ,emp.lastname as Employee_Last_Name
FROM [order] as o
JOIN customer as cust ON o.customerid = cust.id
JOIN employee as emp ON o.employeeid = emp.id;