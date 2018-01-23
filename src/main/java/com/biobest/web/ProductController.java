package com.biobest.web;

import com.biobest.entities.Product;
import com.biobest.services.ProductService;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ProductController {

    private final Logger logger = LoggerFactory.getLogger(ProductController.class);

    public ProductController() {
        logger.debug("Employee controller initialized");
    }
    
    @Autowired
    private ProductService productService;
 

    @RequestMapping(value="/products", method=RequestMethod.GET, produces="application/json")
    @ResponseBody
    public List<Product> getProducts(Model model){
        return this.productService.getProducts();
    }




}