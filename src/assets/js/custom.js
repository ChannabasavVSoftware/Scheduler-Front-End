function loadingServiceShow(zindex, id, flag, msg,subMessage ) {
    try {
        var _id = $("[data-loader=" + id + "]");
        _id.CenterLoader(zindex, id, flag, msg,subMessage);
    } catch (error) {
        loadingServiceHide(id);
    }
}
$.fn.CenterLoader = function (zindex, id, flag, msg,subMessage) {
    var height = $(this).outerHeight() + "px";
    var width = $(this).outerWidth() + "px";
    var top = $(this).offset().top;
    var left = $(this).offset().left;
    var loadingContainer = "body";
    if (flag == true) {
        top = 0;
        left = 0;
        loadingContainer = this;
    }
    var centerTop = Math.max(0, (($(this).outerHeight() / 2) - 7)) + "px";
    var centerLeft = Math.max(0, (($(this).outerWidth() / 2) - 7)) + "px";

    var loadingContain;
    if (id === "" || id === null || id === undefined) {
        id = "loader-image";
    } else {
        var _loadIdAppend = id
        id = id + "_Loader";
    }
    
  
    loadingContain = "<div style='position:fixed;height:100%;width:100%;z-index:2000;top:0;left:0;opacity:1;background:#000000c2;' id='" + id + "' class='loader-image'><div style='position:absolute;top:50%;left:50%;color:white;height: 120px;width: 270px; text-align:center; no-repeat scroll 0 0; background-size:cover' class='loader-style'><img src='assets/loader5.gif' style='width: 80px;text-align:center' align='center'/><h2 style='margin-top:10px'>" + msg;

    if (subMessage !== undefined) {
        loadingContain += "<span style='display: block;font-size:12px'>" + subMessage + "</span>";
    }
    
    loadingContain += "</h2></div></div>";


    if (flag == true) {
        
        loadingContain = "<div style='position:fixed;height:100%;width:100%;z-index:2000;top:0;left:0;opacity:1;background:#000000c2;' id='" + id + "' class='loader-image'><div style='position:absolute;top:50%;left:50%;color:white;height: 120px;width: 270px; text-align:center; no-repeat scroll 0 0; background-size:cover' class='loader-style'><img src='assets/loader5.gif' style='width: 80px;text-align:center' align='center'/><h2 style='margin-top:10px'>" + msg;

        if (subMessage !== undefined) {
            loadingContain += "<span style='display: block;font-size:14px'>" + subMessage + "</span>";
        }
        
        loadingContain += "</h2></div></div>";
    }
    $("body").append(loadingContain);
    
}
function loadingServiceHide(id) {
    if (id === "" || id === null || id === undefined) {
        $(".loader-image").remove();
    } else {
        $("#" + id + "_Loader").remove();
    }
}

