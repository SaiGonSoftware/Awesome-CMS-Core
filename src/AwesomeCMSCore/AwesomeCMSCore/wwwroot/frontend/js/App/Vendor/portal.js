/* global $ */
$(document).ready(function() {
  "use strict";

  // ------------------------------------------------------- //
  // Search Box
  // ------------------------------------------------------ //
  $("#search").on("click", function(e) {
    e.preventDefault();
    $(".search-box").fadeIn();
  });
  $(".dismiss").on("click", function() {
    $(".search-box").fadeOut();
  });

  // ------------------------------------------------------- //
  // Card Close
  // ------------------------------------------------------ //
  $(".card-close a.remove").on("click", function(e) {
    e.preventDefault();
    $(this)
      .parents(".card")
      .fadeOut();
  });

  // ------------------------------------------------------- //
  // Adding fade effect to dropdowns
  // ------------------------------------------------------ //
  $(".dropdown").on("show.bs.dropdown", function() {
    $(this)
      .find(".dropdown-menu")
      .first()
      .stop(true, true)
      .fadeIn();
  });
  $(".dropdown").on("hide.bs.dropdown", function() {
    $(this)
      .find(".dropdown-menu")
      .first()
      .stop(true, true)
      .fadeOut();
  });


  // ------------------------------------------------------- //
  // Sidebar Functionality
  // ------------------------------------------------------ //
  $("#toggle-btn").on("click", function(e) {
    e.preventDefault();
    $(this).toggleClass("active");

    $(".side-navbar").toggleClass("shrinked");
    $(".content-inner").toggleClass("active");
    $(document).trigger("sidebarChanged");

    if ($(window).outerWidth() > 1183) {
      if ($("#toggle-btn").hasClass("active")) {
        $(".navbar-header .brand-small").hide();
        $(".navbar-header .brand-big").show();
      } else {
        $(".navbar-header .brand-small").show();
        $(".navbar-header .brand-big").hide();
      }
    }

    if ($(window).outerWidth() < 1183) {
      $(".navbar-header .brand-small").show();
    }
  });

  // ------------------------------------------------------- //
  // Material Inputs
  // ------------------------------------------------------ //

  let materialInputs = $("input.input-material");

  // activate labels for prefilled values
  materialInputs
    .filter(function() {
      return $(this).val() !== "";
    })
    .siblings(".label-material")
    .addClass("active");

  // move label on focus
  materialInputs.on("focus", function() {
    $(this)
      .siblings(".label-material")
      .addClass("active");
  });

  // remove/keep label on blur
  materialInputs.on("blur", function() {
    $(this)
      .siblings(".label-material")
      .removeClass("active");

    if ($(this).val() !== "") {
      $(this)
        .siblings(".label-material")
        .addClass("active");
    } else {
      $(this)
        .siblings(".label-material")
        .removeClass("active");
    }
  });

  // ------------------------------------------------------- //
  // Footer
  // ------------------------------------------------------ //

  let contentInner = $(".content-inner");

  $(document).on("sidebarChanged", function() {
    adjustFooter();
  });

  $(window).on("resize", function() {
    adjustFooter();
  });

  function adjustFooter() {
    let footerBlockHeight = $(".main-footer").outerHeight();
    contentInner.css("padding-bottom", footerBlockHeight + "px");
  }

  // ------------------------------------------------------- //
  // External links to new window
  // ------------------------------------------------------ //
  $(".external").on("click", function(e) {
    e.preventDefault();
    window.open($(this).attr("href"));
  });
});
