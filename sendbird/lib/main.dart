// ignore_for_file: use_key_in_widget_constructors, prefer_const_constructors, sort_child_properties_last, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    debugShowCheckedModeBanner: false,
    home: ChatDetail(),
  ));
}

class ChatDetail extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.ltr,
      child: Scaffold(
        backgroundColor: Color.fromARGB(255, 3, 3, 3),
        appBar: AppBar(
          backgroundColor: Color.fromARGB(255, 19, 18, 18),
          titleSpacing: 0,
          title: Stack(
            children: [
              Row(
                children: [
                  IconButton(
                    padding: EdgeInsets.only(left: 20),
                    icon: Icon(
                      Icons.arrow_back_ios,
                      color: Color.fromARGB(255, 88, 88, 88),
                      size: 15,
                    ),
                    onPressed: () {
                      Navigator.pop(context);
                    },
                  ),
                  SizedBox(
                    width: 130,
                  ),
                  Text(
                    'username',
                    style: TextStyle(
                      fontFamily: 'OrelegaOne',
                      fontSize: 20,
                      color: const Color.fromARGB(255, 143, 143, 143),
                    ),
                  ),
                ],
              ),
            ],
          ),
          actions: [
            IconButton(
              icon: Icon(
                Icons.menu,
                color: Color.fromARGB(255, 88, 88, 88),
                size: 18,
              ),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
            SizedBox(width: 10),
          ],
        ),
        body: Column(mainAxisAlignment: MainAxisAlignment.end, children: [
          Align(
            alignment: Alignment.bottomLeft,
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 20),
              child: Row(
                children: [
                  IconButton(
                    icon: Icon(
                      Icons.add,
                      color: Color.fromARGB(255, 143, 143, 143),
                      size: 25,
                    ),
                    onPressed: () {
                      Navigator.pop(context);
                    },
                  ),
                  Expanded(
                    child: Container(
                      decoration: BoxDecoration(
                        border: Border.all(
                            color: Color.fromARGB(255, 88, 88, 88)), // Add gray border here
                        borderRadius: BorderRadius.circular(36),
                      ),
                      child: Container(
                        height: 55,
                        decoration: BoxDecoration(
                          color: Color.fromARGB(255, 32, 32, 32),
                          borderRadius: BorderRadius.circular(36),
                        ),
                        child: Row(
                          children: [
                            SizedBox(width: 20,),
                            Expanded(
                              child: TextField(
                                style: TextStyle(
                                  color: Color.fromARGB(255, 0, 0, 0),
                                  fontSize: 20,
                                ),
                                decoration: InputDecoration(
                                  hintText: "Type message.........",
                                  hintStyle: TextStyle(
                                    color: Color.fromARGB(239, 90, 90, 90),
                                    fontSize: 18,
                                  ),
                                  border: InputBorder.none,
                                  contentPadding: EdgeInsets.symmetric(
                                      vertical:
                                          12), // Adjust vertical padding here
                                ),
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.only(right: 8.0),
                              child: SizedBox(
                                height: 30,
                                width: 30,
                                child: FloatingActionButton(
                                  backgroundColor:
                                      Color.fromARGB(255, 65, 64, 64),
                                  onPressed: () {},
                                  child: Icon(
                                    Icons.arrow_upward,
                                    color: Color.fromARGB(255, 38, 38, 39),
                                    size: 20,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ]),
      ),
    );
  }
}
