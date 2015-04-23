function MenuChoice()
{
    if (document.getElementById("menu").value == "Display Category List")
    {
        document.getElementById("section1").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Add Product Category")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "visible";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    
    else if (document.getElementById("menu").value == "Update Category Description")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "visible";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    
    else if (document.getElementById("menu").value == "Delete A Category")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "visible";
        document.getElementById("section5").style.visibility = "hidden";
    }
    
    else if (document.getElementById("menu").value == "About")
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "visible";
    }
    
    else
    {
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
}

function CategoryList()
{
    var clist = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCategories";
    
    clist.onreadystatechange = function()
    {
        if (clist.readyState == 4 && clist.status == 200)
        {
            var output = JSON.parse(clist.responseText);
            GenerateOutput (output);
        }
    }
    
    clist.open("GET", url, true);
    clist.send();


    function GenerateOutput(result)
    {
        var display = "<table><tr><th>Category ID</th><th>Category Name</th><th>Category Description</th></tr>";
        var count = 0;
        var rowid = "oddrow";
        for(count = 0; count < result.GetAllCategoriesResult.length; count ++)
        {
            if (count%2 == 0)
            {
                rowid = "evenrow";
            }
            else
            {
                rowid = "oddrow";
            }
            display += "<tr id=" + rowid + "><td>" + result.GetAllCategoriesResult[count].CID + "</td><td>" + result.GetAllCategoriesResult[count].CName + "</td><td>" + result.GetAllCategoriesResult[count].CDescription + "</td></tr>";
        }
        display += "</table>";
        document.getElementById("catlist").innerHTML = display;
    }
}

function AddCategory()
{
    var ajx = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCategory";
    var name = document.getElementById("catname").value;
    var description = document.getElementById("catdesc").value;
    var objdisplay = document.getElementById("aresult");
    
    var newcategory = '{"CName":"' + name + '","CDescription":"' + description + '"}';
    
    ajx.onreadystatechange = function()
    {
        if (ajx.readyState == 4 && ajx.status == 200)
            {
                var result = JSON.parse(ajx.responseText);
                var outcome = result.WasSuccessful
                var error = result.Exception;
                OperationResult(outcome, error, objdisplay);
            }
    }
    
    ajx.open("POST", url, true);
    ajx.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajx.send(newcategory);
}

function UpdateCatDesc()
    {
        var xmlhttp = new XMLHttpRequest();
        var changeinfo = document.getElementById("bresult");
        
        var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateCatDescription";
        var did = Number(document.getElementById("catidd").value);
        var ndsc = document.getElementById("newdesc").value;
        
        var parameters = '{"CID":' + did + ',"CDescription":"' + ndsc + '"}';
        
        xmlhttp.onreadystatechange = function()
        {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
                {
                    var result = JSON.parse(xmlhttp.responseText);
                    var outcome = result.WasSuccessful
                    var error = result.Exception
                    OperationResult(outcome, error, changeinfo);
                }
        }    
                
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(parameters);
    }

function DeleteCategory()
       {
            var xmlhttp = new XMLHttpRequest();
            var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
            url += document.getElementById("catedelete").value;
            var objdisplay = document.getElementById("cresult");
            window.confirm("Are you sure you want to delete this category?");
                        
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var output = JSON.parse(xmlhttp.responseText);
                    var outcome = output.DeleteCategoryResult.WasSuccessful
                    var error = output.DeleteCategoryResult.Exception;
                    OperationResult(outcome, error, objdisplay);
                }
            }
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        }

function OperationResult(success, exception, displayObject)
{
    switch (success)
     {
        case 1:
            displayObject.innerHTML = "The operation was successful!";
            break;
        case 0:
            displayObject.innerHTML = "The operation was not successful:<br>" + exception;
            break;
        case -2:
            displayObject.innerHTML = "The operation was not successfuL!.";
            break;
        case -3:
            displayObject.innerHTML = "The operation was not successful due to INVALID ID";
            break;
        default:
            alert("The operation code can't be completed.");
    }
}